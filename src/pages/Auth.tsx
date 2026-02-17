import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../services/api';

type RequestError = {
  message?: string;
};

export const Auth: React.FC = () => {
  const { t, login } = useApp();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validatePassword = (pass: string) => {
    // Min 8 chars, 1 uppercase, 1 number
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
       if (!validatePassword(password)) {
         setError("La contraseña debe tener 8 caracteres, 1 mayúscula y 1 número.");
         return;
       }
    }

    try {
      setIsSubmitting(true);
      const authData = await authRequest(isLogin ? 'login' : 'register', {
        name,
        email,
        password
      });

      login(authData.user, authData.token);
      navigate('/profile');
    } catch (requestError) {
      const error = requestError as RequestError;
      setError(error.message || 'No se pudo completar la autenticación.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
           <span className="text-4xl font-bold tracking-tighter dark:text-white">
              MODAI<span className="text-modai-orange">.</span>
            </span>
           <p className="text-gray-500 mt-2">{isLogin ? t.auth.loginTitle : t.auth.registerTitle}</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm font-bold text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.auth.name}</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-modai-blue" />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.auth.email}</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-modai-blue" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">{t.auth.pass}</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:border-modai-blue" />
            {!isLogin && <p className="text-xs text-gray-400 mt-1">Min 8 chars, 1 Uppercase, 1 Number</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-modai-blue hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? 'Procesando...' : t.auth.submit}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-gray-500 hover:text-modai-orange">
            {isLogin ? t.auth.noAccount : t.auth.hasAccount}
          </button>
        </div>
      </div>
    </div>
  );
};