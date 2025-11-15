// src/pages/Users/UsersPage.tsx
import { UserResponseDto, UsersService } from "@/api";
import { useUsers } from "@/hooks/useUsers";
import React from "react";

export default function UsersPage() {
  const { data: users = [], isLoading, refetch } = useUsers();

  const remove = async (id: string) => {
    if (!confirm("Delete user?")) return;
    await UsersService.usersControllerRemove(id);
    refetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? <div>Loading...</div> : null}

      <div className="space-y-3">
        {users.map((u: UserResponseDto) => (
          <div
            key={u.userId}
            className="p-3 bg-white/5 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{u.username}</div>
              <div className="text-xs text-gray-400">{u.email}</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => remove(u.userId)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
