const { z } = require('zod');

const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password requirements not met');

const registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Invalid email format'),
  password: passwordSchema
});

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

const billingSchema = z
  .object({
    accountNumber: z.string().trim().optional(),
    fiscalName: z.string().trim().optional(),
    cif: z.string().trim().optional(),
    fiscalAddress: z.string().trim().optional(),
    legalRep: z.string().trim().optional()
  })
  .partial();

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  type: z.enum(['top', 'bottom', 'shoes']),
  style: z.enum(['casual', 'sport', 'elegant', 'informal', 'work']),
  image: z.string(),
  url: z.string()
});

const outfitSchema = z.object({
  id: z.string(),
  top: productSchema,
  bottom: productSchema,
  shoes: productSchema,
  dateCreated: z.string()
});

const updateUserSchema = z
  .object({
    name: z.string().trim().min(1).optional(),
    email: z.string().trim().email().optional(),
    plan: z.enum(['free', 'premium', 'business']).optional(),
    stylePreference: z.enum(['casual', 'sport', 'elegant', 'informal', 'work']).optional(),
    theme: z.enum(['light', 'dark']).optional(),
    language: z.enum(['es', 'en', 'cn']).optional(),
    consent: z.boolean().optional(),
    consentDate: z.string().optional(),
    favorites: z.array(z.string()).optional(),
    outfits: z.array(outfitSchema).optional(),
    billing: billingSchema.optional()
  })
  .strict();

const validateSchema = (schema, data) => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return {
    success: false,
    message: result.error.issues[0]?.message || 'Validation failed'
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
  validateSchema
};
