import React, { MouseEventHandler } from "react";

export interface AuthFormField {
  type: "text" | "email" | "password" | "number" | "file";
  name: string;
  required?: boolean;
  accept?: string;
  minLength?: number;
  label?: string;
}

export interface AuthFormProps {
  fields: AuthFormField[];
  type: "login" | "register";
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?:
  | "primary"
  | "secondary"
  | "tertiary"
  | "black"
  | "outline-primary"
  | "outline-secondary"
  | "outline-tertiary"
  | "outline-black"
  | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface InputProps {
  type: "text" | "email" | "password" | "number" | "file";
  name?: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  accept?: string;
  minLength?: number;
  label?: string;
}
export interface RefreshTokenResponse {
  accessToken?: string;
}

export interface User {
  _id: number;
  username: string;
  email: string;
  image: string;
  role: number;
}
export interface AccountContextType {
  user: User | undefined;
  loading: boolean;
}