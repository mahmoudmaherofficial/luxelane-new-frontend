"use client";
import { getAllUsers } from "@/api/users";
import api from "@/lib/axiosInterceptor";
import { User } from "@/types";
import { PencilIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "@/components/ui/dashboard/DataTable";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (userId: string) => {
    // TODO: Navigate to edit page or open modal
    console.log("Edit user", userId);
  };

  const handleDelete = async (userId: string) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const columns = [
    { key: "username", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  const actions = (user: User) => (
    <>
      <button
        onClick={() => handleEdit(user._id)}
        className="bg-primary-500 text-white px-2 py-1 rounded hover:bg-primary-600">
        <PencilIcon className="w-4" />
      </button>
      <button
        onClick={() => handleDelete(user._id)}
        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
        <Trash className="w-4" />
      </button>
    </>
  );

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Users</h1>
      <DataTable
        data={users}
        columns={columns}
        keyExtractor={(user) => user._id}
        actions={actions}
        noDataMessage="No users found."
      />
    </div>
  );
};

export default UsersPage;
