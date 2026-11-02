export const API_BASE = '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('stayoraToken') || localStorage.getItem('stayora_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('stayoraToken', token);
  localStorage.setItem('stayora_token', token);
}

export function clearAuthToken(): void {
  localStorage.removeItem('stayoraToken');
  localStorage.removeItem('stayora_token');
  localStorage.removeItem('stayoraUser');
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}
