"use client";

import { Order } from "@/types";
import { useEffect, useState } from "react";
import DataTable from "@/components/ui/dashboard/DataTable";
import Button from "@/components/ui/Button";
import { FaPen, FaEye, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import api from "@/lib/axiosInterceptor";
import { getAllOrders } from "@/api/orders";
import { formatDate } from "@/lib/formatDate";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // Fetch user role (assuming it's stored in localStorage or fetched from an API)
        const role = localStorage.getItem("userRole") || "2004"; // Default to user role
        setUserRole(parseInt(role, 10));

        const res = await getAllOrders();
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        Swal.fire("Error", "Failed to fetch orders", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, currentStatus: string) => {
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    const { value: newStatus } = await Swal.fire({
      title: "Update Order Status",
      input: "select",
      inputOptions: validStatuses.reduce(
        (acc, status) => {
          acc[status] = status.charAt(0).toUpperCase() + status.slice(1);
          return acc;
        },
        {} as Record<string, string>
      ),
      inputValue: currentStatus,
      inputPlaceholder: "Select status",
      showCancelButton: true,
      confirmButtonText: "Update",
      confirmButtonColor: "#1a3d60",
      cancelButtonColor: "#d33",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a status!";
        }
        if (value === currentStatus) {
          return "Please select a different status!";
        }
        return null;
      },
    });

    if (newStatus) {
      try {
        setIsLoading(true);
        await api.put(`/orders/${orderId}`, { status: newStatus });
        setOrders((prev) => prev.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order)));
        Swal.fire("Success", "Order status updated successfully", "success");
      } catch (err) {
        console.error("Update failed", err);
        Swal.fire("Error", "Failed to update order status", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setIsLoading(true);
          await api.delete(`/orders/${orderId}`);
          setOrders((prev) => prev.filter((order) => order._id !== orderId));
          Swal.fire("Deleted!", "The order has been deleted.", "success");
        } catch (err) {
          console.error("Delete failed", err);
          Swal.fire("Error", "Failed to delete order", "error");
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  const columns = [
    {
      key: "orderId",
      header: "Order ID",
      render: (order: Order) => {
        return `*****${order._id.slice(-6)}`;
      }, // Show last 6 chars of ID
    },
    {
      key: "user",
      header: "Customer",
      render: (order: Order) => order.user.username,
    },
    {
      key: "phoneNumber",
      header: "Phone Number",
      render: (order: Order) => order.phoneNumber.slice(0, 6) + "*****",
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      render: (order: Order) => `${order.totalAmount.toFixed(1)} L.E`,
    },
    {
      key: "status",
      header: "Status",
      render: (order: Order) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            order.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : order.status === "shipped"
                ? "bg-blue-100 text-blue-800"
                : order.status === "delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-orange-100 text-orange-800"
          }`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      ),
    },
    {
      key: "orderDate",
      header: "Order Date",
      render: (order: Order) => formatDate(order.orderDate, true),
    },
  ];

  const actions = (order: Order) => (
    <>
      <Link href={`/dashboard/orders/${order._id}`}>
        <Button variant="outline-primary" size="sm" className="w-8 h-8">
          <FaEye className="w-4 h-4" />
        </Button>
      </Link>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => handleUpdateStatus(order._id, order.status)}
        className="w-8 h-8">
        <FaPen className="w-4 h-4" />
      </Button>
      <Button variant="danger" size="sm" onClick={() => handleDeleteOrder(order._id)} className="w-8 h-8">
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
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900">Orders</h1>
        </motion.div>
        <DataTable<Order>
          data={orders}
          columns={columns as any}
          keyExtractor={(order: Order) => order._id}
          actions={actions}
          noDataMessage="No orders found."
        />
      </section>
    </>
  );
};

export default OrdersPage;
