import { useState } from "react";
import { UserResponseDto, UsersService } from "@/api";
import { useUsers } from "@/hooks/useUsers";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Loader2, Users as UsersIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import Avatar from "@/components/Profile/Avatar";

export default function UsersPage() {
  const { t } = useTranslation();
  const { data: users = [], isLoading, refetch } = useUsers();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const remove = async (id: string) => {
    setPendingDeleteId(id);
    try {
      await UsersService.usersControllerRemove(id);
      toast.success(t("users.deleteSuccess", "User deleted successfully"));
      await refetch();
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error(t("users.deleteFailed", "Failed to delete user"));
    } finally {
      setPendingDeleteId(null);
      setConfirmingId(null);
    }
  };

  return (
    <div className="relative space-y-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <header>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t("path.users")}
        </h1>
      </header>

      <div className="rounded-2xl border border-white/40 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-gray-500 dark:text-gray-400">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">
              {t("users.loading", "Loading users...")}
            </span>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500">
              <UsersIcon className="h-6 w-6" />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("users.noUsersFound", "No users found")}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {users.map((u: UserResponseDto) => {
              const isPending = pendingDeleteId === u.userId;
              const isConfirming = confirmingId === u.userId;

              return (
                <li
                  key={u.userId}
                  className="flex items-center justify-between gap-4 p-4 sm:p-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar username={u.username} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-gray-900 dark:text-white">
                        {u.username}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {u.email}
                      </p>
                    </div>
                  </div>

                  <div className="relative shrink-0">
                    <button
                      onClick={() => setConfirmingId(u.userId)}
                      disabled={isPending}
                      className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                    >
                      {isPending ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      {t("users.delete", "Delete")}
                    </button>

                    <AnimatePresence>
                      {isConfirming && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setConfirmingId(null)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute end-0 top-full z-50 mt-2 w-64 rounded-xl border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/90"
                          >
                            <div className="mb-3 flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {t(
                                  "users.confirmDelete",
                                  'Delete "{{name}}"?',
                                  { name: u.username },
                                )}
                              </p>
                              <button
                                onClick={() => setConfirmingId(null)}
                                className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                aria-label={t("common.close", "Close")}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => setConfirmingId(null)}
                                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                              >
                                {t("common.cancel")}
                              </button>
                              <button
                                onClick={() => remove(u.userId)}
                                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                              >
                                {t("users.delete", "Delete")}
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
