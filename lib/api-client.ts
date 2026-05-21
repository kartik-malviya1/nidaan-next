import { ApiError } from "./types";

const BASE_URL = "/api";

class HttpError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(status: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.errors = errors;
  }
}

function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin-token");
}

function handleAuthFailure() {
  if (typeof window === "undefined") return;
  
  // Clear token
  localStorage.removeItem("admin-token");
  localStorage.removeItem("admin-user");
  
  // Clear cookie
  document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  
  // Redirect if not already on login
  if (!window.location.pathname.startsWith("/login")) {
    window.location.href = "/login?expired=true";
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers);

  // Set default headers
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Inject Authorization Header
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    handleAuthFailure();
    const errBody = await response.json().catch(() => ({}));
    throw new HttpError(401, errBody.message || "Unauthorized");
  }

  if (!response.ok) {
    let message = "An error occurred";
    let errors: Record<string, string[]> | undefined;

    try {
      const errBody = await response.json();
      message = errBody.message || message;
      errors = errBody.errors;
    } catch (_) {
      // Ignore JSON parse error if response is not JSON
    }

    throw new HttpError(response.status, message, errors);
  }

  // Handle empty or 204 No Content responses
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),
    
  post: <T>(endpoint: string, body: any, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
    
  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
