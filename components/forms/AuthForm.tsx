"use client";
import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { redirect } from "next/navigation";
import "@/app/styles/forms/auth-form.css";
import api from "@/lib/axiosInterseptor";
import { AuthFormProps } from "@/types";
import Cookies from "js-cookie";

const authFormDetails = {
  login: {
    title: "Login to your account",
    linkText: "Don't have an account?",
    linkUrl: "/register",
  },
  register: {
    title: "Register a new account",
    linkText: "Already have an account?",
    linkUrl: "/login",
  },
};

const AuthForm = ({ fields, type }: AuthFormProps) => {
  const { title, linkText, linkUrl } = authFormDetails[type];

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const res = await api.post(`/auth/${type}`, type === "login" ? data : formData);

      const { accessToken } = res.data;
      // Cookies.set("accessToken", accessToken, { expires: 1 / (60 * 24) });
      redirect("/profile");
    } catch (error) {
      console.error("Submit form error:", error);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 h-screen">
      <div className="auth-form-container bg-white shadow-lg rounded-lg p-6 w-96 md:w-[600px] lg:w-1/2 min-h-[350px]">
        <form className="flex flex-col gap-4 h-full" onSubmit={submitForm}>
          <h1 className="text-3xl font-bold mb-2 text-primary-500">{title}</h1>

          {fields.map((field, index) => (
            <Input
              key={index}
              type={field.type}
              name={field.name}
              required={field.required}
              accept={field.accept}
              minLength={field.minLength}
              label={field.label ? field.label : field.name}
            />
          ))}

          <Button type="submit" className="mt-auto">
            {title.split(" ")[0]}
          </Button>

          <p className="text-center text-slate-500">
            {linkText}{" "}
            <Link href={linkUrl} className="text-sky-500 hover:text-sky-400 transition-all capitalize">
              {linkUrl.split("/").pop()}
            </Link>
          </p>
        </form>
      </div>
      <p className="text-2xl text-primary-500 font-semibold">OR</p>
      <Button variant="outline-primary" className="w-2/3 sm:w-1/3" onClick={() => redirect("/")}>
        Go Home
      </Button>
    </section>
  );
};

export default AuthForm;

