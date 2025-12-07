const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.cureox.com';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function apiRequest<T>(
  path: string,
  options: RequestInit & { method?: HttpMethod } = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  let data: unknown;
  const text = await response.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message =
      typeof data === 'object' && data && 'message' in data
        ? String((data as any).message)
        : response.statusText || 'Request failed';
    throw new Error(message);
  }

  return data as T;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organization?: string;
  phone?: string;
};

export type RegisterResponse = {
  userId: string;
  requiresEmailVerification: boolean;
};

export type VerifyEmailPayload = {
  email: string;
  code: string;
};

export type VerifyEmailResponse = {
  success: boolean;
};

export type ProcessPaymentPayload = {
  productId: string;
  amount: number;
  currency: string;
  customerEmail: string;
};

export type ProcessPaymentResponse = {
  paymentUrl: string;
  reference: string;
};

export async function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function register(payload: RegisterPayload) {
  return apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function verifyEmail(payload: VerifyEmailPayload) {
  return apiRequest<VerifyEmailResponse>('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function processPayment(payload: ProcessPaymentPayload) {
  return apiRequest<ProcessPaymentResponse>('/payments/checkout', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

