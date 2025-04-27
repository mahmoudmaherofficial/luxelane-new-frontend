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
  required?: boolean;
  accept?: string;
  minLength?: number;
  label?: string;
}