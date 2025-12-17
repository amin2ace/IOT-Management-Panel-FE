import { Role } from "@/api";
import { useAuth } from "@/context/AuthContext";
import React, { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

export function RequireRole({
  allowed,
  children,
}: {
  allowed: Role[];
  children: JSX.Element;
}) {
  const { t } = useTranslation();
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const has = allowed.some((role) => user.roles.includes(role));
  if (!has)
    return (
      <div className="p-6 text-center text-red-400">
        {t("auth.accessDenied")}
      </div>
    );
  return children;
}
