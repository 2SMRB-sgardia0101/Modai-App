const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const User = require('./models/User');
const { authMiddleware, JWT_SECRET } = require('./middleware/auth');
const {
  registerSchema,
  loginSchema,
  updateUserSchema,
  validateSchema
} = require('./validators/userValidators');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/modai';
const PORT = Number(process.env.PORT) || 5000;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: 'Too many authentication attempts, please try again later' }
});

const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : userDoc;
  const { password, __v, ...safeUser } = user;
  return safeUser;
};

const normalizeEmail = (email = '') => email.trim().toLowerCase();

const createToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

const handleServerError = (res, err) => {
  console.error(err);
  return res.status(500).json({ error: err.message || 'Internal server error' });
};

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Routes
app.post('/api/register', authLimiter, async (req, res) => {
  try {
    const validation = validateSchema(registerSchema, req.body);
    if (!validation.success) {
      return res.status(400).json({ msg: validation.message });
    }

    const { name, email, password } = validation.data;
    const normalizedEmail = normalizeEmail(email);

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ msg: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword
    });
    await newUser.save();

    const safeUser = sanitizeUser(newUser);
    const token = createToken(safeUser._id.toString());
    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ msg: 'Email already registered' });
    }

    handleServerError(res, err);
  }
});

app.post('/api/login', authLimiter, async (req, res) => {
  try {
    const validation = validateSchema(loginSchema, req.body);
    if (!validation.success) {
      return res.status(400).json({ msg: validation.message });
    }

    const { email, password } = validation.data;
    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const safeUser = sanitizeUser(user);
    const token = createToken(safeUser._id.toString());
    res.json({ user: safeUser, token });
  } catch (err) {
    handleServerError(res, err);
  }
});

app.put('/api/user/:id', authMiddleware, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid user id' });
    }

    if (req.auth.userId !== req.params.id) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const validation = validateSchema(updateUserSchema, req.body);
    if (!validation.success) {
      return res.status(400).json({ msg: validation.message });
    }

    const allowedUpdates = { ...validation.data };

    if (allowedUpdates.email) {
      allowedUpdates.email = normalizeEmail(allowedUpdates.email);

      const existingWithEmail = await User.findOne({
        email: allowedUpdates.email,
        _id: { $ne: req.params.id }
      });

      if (existingWithEmail) {
        return res.status(409).json({ msg: 'Email already registered' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(sanitizeUser(updatedUser));
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ msg: 'Email already registered' });
    }

    handleServerError(res, err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));