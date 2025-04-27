"use client";
import Button from "@/components/ui/Button";
import api from "@/lib/axiosInterseptor";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(users);

  return (
    <section className="container">
      <h1>Home</h1>
      <Button>Click me</Button>
    </section>
  );
}
