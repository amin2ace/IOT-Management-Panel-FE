import { Role } from "@/api";

export const rolePriority = (roles: Role[]) => {
  const priorityOrder = [
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.ENGINEER,
    Role.VIEWER,
    Role.TEST,
  ];

  return priorityOrder.find((role) => roles.includes(role)) || Role.VIEWER;
};
