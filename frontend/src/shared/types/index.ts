// User types
export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  subscription_status: SubscriptionStatus;
}

export interface UserProfile extends User {
  bio?: string;
  avatar?: string;
  learning_progress: Record<string, any>;
}

// Subscription types
export interface SubscriptionStatus {
  active: boolean;
  plan: 'free' | 'basic' | 'premium';
  expires_at?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

// Code execution types
export interface CodeExecutionRequest {
  code: string;
  language: string;
  timeout?: number;
}

export interface CodeExecutionResponse {
  output: string;
  error?: string;
  execution_time: number;
}

// Payment types
export interface CheckoutSessionRequest {
  plan: 'basic' | 'premium';
  success_url?: string;
  cancel_url?: string;
}

export interface CheckoutSessionResponse {
  checkout_url: string;
  session_id: string;
}
