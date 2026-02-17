import { UserData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const TOKEN_STORAGE_KEY = 'modai_token';

type AuthPayload = {
  email: string;
  password: string;
  name?: string;
};

export type AuthResponse = {
  user: UserData;
  token: string;
};

type ApiErrorResponse = {
  msg?: string;
  error?: string;
};

let authToken: string | null = localStorage.getItem(TOKEN_STORAGE_KEY);

export const setAuthToken = (token: string) => {
  authToken = token;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const clearAuthToken = () => {
  authToken = null;
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const parseError = async (response: Response) => {
  try {
    const data = (await response.json()) as ApiErrorResponse;
    return data.msg || data.error || 'Request failed';
  } catch {
    return 'Request failed';
  }
};

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...options
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
};

export const authRequest = async (mode: 'login' | 'register', payload: AuthPayload): Promise<AuthResponse> => {
  const endpoint = mode === 'login' ? '/api/login' : '/api/register';
  const authData = await request<AuthResponse>(endpoint, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  setAuthToken(authData.token);
  return authData;
};

export const updateUserRequest = async (userId: string, data: Partial<UserData>): Promise<UserData> => {
  return request<UserData>(`/api/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};
