
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues extends LoginFormValues {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface PetFormValues {
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  status: 'available' | 'pending' | 'adopted';
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthContextType {
  accessToken: string;
  user: User | null; 
  setAuthData: (token: string, user: User | null) => void;
}
export interface Pet {
  _id: string;          
  name: string;
  species: string;      
  breed: string;
  age: number;
  description: string;
  imageUrl?: string;    
  status: 'available' | 'pending' | 'adopted';
  createdAt: string;   
  updatedAt: string;
}
export interface GetOptions<TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: any) => void;
  headers?: Record<string, string>;
  enabled?: boolean; 
}


export interface PostOptions<TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: any) => void;
  credentials?: RequestCredentials; 
  headers?: Record<string, string>; 
}

export type AlertType = "success" | "error";
export type AlertState = {
    type: AlertType;
    title?: string;
    description?: string;
};
export interface InputSearchProps {
    onSearch: (value: string) => void; 
}
export type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';