"use client";
import { useEffect, useState } from "react";
import { updateAccount } from "@/api/account";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";
import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import { useAccountContext } from "@/context/AccountContext";

const EditProfilePage = () => {
  const { user, loading } = useAccountContext();
  interface FormData {
    username: string;
    email: string;
  }

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
  });

  useEffect(() => {
    setFormData({
      username: user?.username ?? "",
      email: user?.email ?? "",
    });
  }, []); // Empty dependency array to run only once on mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAccount(formData);
      toast.success("Profile updated successfully!");
      window.location.replace("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="bg-primary-100 h-screen pt-14">
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md text-slate-900 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <Input type="text" name="username" value={formData.username} onChange={handleChange} label="Username" />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email" // Corrected label from "Username" to "Email"
            />
            <Button type="submit" className="w-full md:w-auto">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
