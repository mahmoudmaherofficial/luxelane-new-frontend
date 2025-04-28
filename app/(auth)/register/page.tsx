import AuthForm from "@/components/forms/AuthForm";
import React from "react";

export const metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <div className="bg-primary-100">
      <div className="container">
        <AuthForm
          fields={[
            { type: "text", name: "username", required: true, minLength: 4 },
            { type: "email", name: "email", required: true },
            { type: "file", name: "image" ,accept: "image/*"},
            { type: "password", name: "password", required: true, minLength: 8 },
            { type: "password", name: "confirmPassword", label: "confirm password", required: true, minLength: 8 },
          ]}
          type="register"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
