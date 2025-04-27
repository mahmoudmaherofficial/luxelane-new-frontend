import AuthForm from "@/components/forms/AuthForm";
import Input from "@/components/ui/Input";
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-primary-100">
      <div className="container">
        <AuthForm
          fields={[
            { type: "email", name: "email", required: true },
            { type: "password", name: "password", required: true, minLength: 8 },
          ]}
          type="login"
        />
      </div>
    </div>
  );
};

export default LoginPage;
