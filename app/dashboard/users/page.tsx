"use client";
import { getAllUsers } from "@/api/users";
import api from "@/lib/axiosInterceptor";
import { User } from "@/types";
import { PencilIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import DataTable from "@/components/ui/dashboard/DataTable";
import Button from "@/components/ui/Button";
import { FaPen, FaPencil, FaTrash } from "react-icons/fa6";

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
    { key: "no", header: "#" },
    { key: "username", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ];

  const actions = (user: User) => (
    <>
      <Button variant="outline-primary" size="sm" onClick={() => handleEdit(user._id)} className="w-8 h-8">
        <FaPen className="w-4 h-4" />
      </Button>
      <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)} className="w-8 h-8">
        <FaTrash className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Users</h1>
      <DataTable
        data={users}
        columns={columns}
        keyExtractor={(user) => user._id}
        actions={actions}
        noDataMessage="No users found."
      />
    </section>
  );
};

export default UsersPage;
