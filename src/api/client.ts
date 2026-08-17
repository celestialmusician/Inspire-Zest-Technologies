const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const api = {
  contact: (payload: ContactPayload) =>
    request<ContactResponse>('/api/contact/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
