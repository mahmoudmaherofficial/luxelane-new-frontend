import React, { MouseEventHandler, ReactNode } from "react";

export interface AuthFormField {
  type: "text" | "email" | "password" | "number" | "file";
  name: string;
  required?: boolean;
  accept?: string;
  minLength?: number;
  label?: string;
  className?: string;
  pattern?: string;
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
  className?: string;
  pattern?: string;
  min?: number;
}
export interface RefreshTokenResponse {
  accessToken?: string | undefined;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  image: string;
  role: number;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  updatedAt?: string | undefined;
}

export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number | string;
  images?: string[];
  stock: number | string;
  size: string[];
  colors: string[];
  category: string;
  updatedAt?: string | undefined;
}

export interface AccountContextType {
  user: User | undefined;
  loading: boolean;
}

export interface EditProfileFormData {
  username: string;
  email: string;
}

export interface DashboardNavbarProps {
  toggleSidebar: any;
  className?: string;
  isSidebarOpen?: boolean;
}

export interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: (value: boolean | ((prev: boolean) => boolean)) => void;
  className?: string;
  onStateChange?: (isPinned: boolean, isExpanded: boolean) => void;
}

export interface DashboardNavItem {
  name: string;
  Icon: any;
  href: string;
  allowedRoles: number[];
}

export interface dropdownMenuItem {
  href: string;
  label: string;
}

// export interface Column<T> {
//   key: string;
//   header: string;
//   render?: (item: T) => ReactNode;
// }

// export interface DataTableProps<T> {
//   data: T[];
//   columns: Column<T>[];
//   keyExtractor: (item: T) => string;
//   actions?: (item: T) => ReactNode;
//   noDataMessage?: string;
// }
export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T, index: number) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  actions?: (item: T) => ReactNode;
  noDataMessage?: string;
  className?: string;
  rowClassName?: (index: number) => string;
  roleMap?: Record<number, string>;
  currentUserId?: string | null;
}
