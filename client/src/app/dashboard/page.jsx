"use client";

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user.name}</p>
    </div>
  );
}