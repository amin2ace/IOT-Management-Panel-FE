// src/pages/Users/UsersPage.tsx
import { UserResponseDto, UsersService } from "@/api";
import { useUsers } from "@/hooks/useUsers";
import React from "react";
import "@/styles/pages/users.css";

export default function UsersPage() {
  const { data: users = [], isLoading, refetch } = useUsers();

  const remove = async (id: string) => {
    if (!confirm("Delete user?")) return;
    await UsersService.usersControllerRemove(id);
    refetch();
  };

  return (
    <div className="usersPageContainer">
      <header className="users-header">
        <h1>Users</h1>
      </header>

      {isLoading ? <div className="users-loading">Loading users...</div> : null}

      {users.length === 0 && !isLoading ? (
        <div className="users-empty">No users found</div>
      ) : (
        <div className="users-list">
          {users.map((u: UserResponseDto) => (
            <div key={u.userId} className="user-item">
              <div className="user-info">
                <div className="user-info-name">{u.username}</div>
                <div className="user-info-email">{u.email}</div>
              </div>
              <div className="user-actions">
                <button
                  onClick={() => remove(u.userId)}
                  className="user-delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
