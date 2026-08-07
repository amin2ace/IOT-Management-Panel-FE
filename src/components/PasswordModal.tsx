import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { KeyRound, Lock, Eye, EyeOff, Loader2, X } from "lucide-react";
import { TextField } from "@/components/UI/FormFields";

type ChangePasswordMutation = {
  mutate: (
    data: { oldPassword: string; newPassword: string },
    options?: { onSuccess?: () => void; onError?: () => void },
  ) => void;
  isPending?: boolean;
};

export default function PasswordModal({
  onClose,
  changePassword,
}: {
  onClose: () => void;
  changePassword: ChangePasswordMutation;
}) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit() {
    if (!form.oldPassword || !form.newPassword) return;
    changePassword.mutate(form, {
      onSuccess: () => {
        toast.success(
          t("profile.passwordChanged", "Password changed successfully"),
        );
        onClose();
      },
      onError: () =>
        toast.error(t("profile.incorrectPassword", "Incorrect password")),
    });
  }

  // Escape to close + outside click + scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node))
        onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const isDisabled =
    changePassword.isPending || !form.oldPassword || !form.newPassword;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-modal-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        />

        <div className="flex h-full items-center justify-center px-4">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-sm rounded-2xl border border-white/40 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/70"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2
                id="password-modal-title"
                className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
              >
                <KeyRound className="h-5 w-5 text-indigo-500" />
                {t("profile.changePassword")}
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100/70 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label={t("common.close", "Close")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <TextField
                type={showOld ? "text" : "password"}
                name="oldPassword"
                label={t("profile.oldPassword", "Current password")}
                icon={Lock}
                onChange={handleChange}
                autoComplete="current-password"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowOld((v) => !v)}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    aria-label={
                      showOld
                        ? t("common.hide", "Hide password")
                        : t("common.show", "Show password")
                    }
                    tabIndex={-1}
                  >
                    {showOld ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />

              <TextField
                type={showNew ? "text" : "password"}
                name="newPassword"
                label={t("profile.newPassword", "New password")}
                icon={Lock}
                onChange={handleChange}
                autoComplete="new-password"
                endAdornment={
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    aria-label={
                      showNew
                        ? t("common.hide", "Hide password")
                        : t("common.show", "Show password")
                    }
                    tabIndex={-1}
                  >
                    {showNew ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={submit}
                disabled={isDisabled}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
              >
                {changePassword.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {t("common.save")}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
