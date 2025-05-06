"use client";

import { Category } from "@/types";
import { useEffect, useState } from "react";
import DataTable from "@/components/ui/dashboard/DataTable";
import Button from "@/components/ui/Button";
import { FaPen, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import api from "@/lib/axiosInterceptor";
import { getAllCategories } from "@/api/categories";
import { render } from "solid-js/web";
import { formatDate } from "@/lib/formatDate";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await getAllCategories();
        setCategories(res.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (categoryId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        await api.delete(`/categories/${categoryId}`);
        setCategories((prev) => prev.filter((category) => category._id !== categoryId));
        Swal.fire("Deleted!", "The category has been deleted.", "success");
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire("Error", "Failed to delete category", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const columns = [
    { key: "name", header: "Category Name" },
    { key: "description", header: "Description" },
    {
      key: "updatedAt",
      header: "Last Update",
      render: (category: Category) => formatDate(category.updatedAt as string, true),
    },
  ];

  const actions = (category: Category) => (
    <>
      <Link href={`/dashboard/categories/${category._id}/edit`}>
        <Button variant="outline-primary" size="sm" className="w-8 h-8">
          <FaPen className="w-4 h-4" />
        </Button>
      </Link>
      <Button variant="danger" size="sm" onClick={() => handleDelete(category._id)} className="w-8 h-8">
        <FaTrash className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <>
      {isLoading && <Loader />}
      <section className="p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900">Categories</h1>
          <Link href={"/dashboard/categories/create"}>
            <Button variant="outline-primary">Add Category</Button>
          </Link>
        </motion.div>
        <DataTable<Category>
          data={categories}
          columns={columns as any}
          keyExtractor={(category: Category) => category._id}
          actions={actions}
          noDataMessage="No categories found."
        />
      </section>
    </>
  );
};

export default CategoriesPage;
