import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function PasswordModal({
  onClose,
  changePassword,
}: {
  onClose: () => void;
  changePassword: any;
}) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit() {
    changePassword.mutate(form, {
      onSuccess: () => {
        toast.success(t("passwordChanged"));
        onClose();
      },
      onError: () => toast.error(t("incorrectPassword")),
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-lg font-semibold">{t("changePassword")}</h2>

        <input
          type="password"
          name="oldPassword"
          placeholder={t("oldPassword")}
          className="w-full bg-gray-700 px-3 py-2 rounded-md"
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder={t("newPassword")}
          className="w-full bg-gray-700 px-3 py-2 rounded-md"
          onChange={handleChange}
        />

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-700 rounded" onClick={onClose}>
            {t("cancel")}
          </button>
          <button className="px-4 py-2 bg-green-600 rounded" onClick={submit}>
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}
