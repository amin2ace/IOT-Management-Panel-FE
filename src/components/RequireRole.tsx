import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import type { Role } from "@/types/auth";

export function RequireRole({
  allowed,
  children,
}: {
  allowed: Role[];
  children: JSX.Element;
}) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const has = allowed.includes(user.role);
  if (!has)
    return <div className="p-6 text-center text-red-400">Access denied</div>;
  return children;
}
