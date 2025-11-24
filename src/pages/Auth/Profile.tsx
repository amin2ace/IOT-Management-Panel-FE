import React, { useState } from "react";
import {
  useProfile,
  useUpdateProfile,
  useChangePassword,
  useUploadProfilePhoto,
} from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import PasswordModal from "@/components/PasswordModal";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: user, refetch } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const uploadPhoto = useUploadProfilePhoto();

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  React.useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    updateProfile.mutate(form, {
      onSuccess: () => {
        toast.success(t("profileUpdated"));
        setIsEditing(false);
        refetch();
      },
      onError: () => toast.error(t("updateFailed")),
    });
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadPhoto.mutate(file, {
      onSuccess: () => {
        toast.success(t("photoUpdated"));
        refetch();
      },
      onError: () => toast.error(t("uploadFailed")),
    });
  }

  return (
    <div className="dashboardProfileContainer">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{t("profile.title")}</h1>
      </header>

      {/* Profile Card */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoUrl || "/default-avatar.png"}
            className="w-20 h-20 rounded-full object-cover border border-gray-800 dark:border-gray-200"
          />

          <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm">
            {t("profile.changePhoto")}
            <input
              type="file"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        {/* User Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {["firstName", "lastName", "email", "username"].map((field) => (
            <div key={field} className="flex flex-col gap-1">
              <label className="text-indigo-950 dark:text-gray-200/80 text-sm">
                {t("profile." + field)}
              </label>
              <input
                name={field}
                disabled={!isEditing || field === "email"}
                value={(form as any)[field]}
                onChange={handleChange}
                className="px-3 py-2 rounded-md bg-indigo-50 dark:bg-indigo-100 text-indigo-950 dark:text-gray-800"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          {/* Edit / Save */}
          {!isEditing ? (
            <button
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              {t("profile.edit")}
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md"
                onClick={() => {
                  setIsEditing(false);
                  setForm({
                    username: user?.firstName || "",
                    email: user?.email || "",
                  });
                }}
              >
                {t("common.cancel")}
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md"
                onClick={handleSave}
              >
                {t("common.saveChanges")}
              </button>
            </div>
          )}

          {/* Change Password */}
          <button
            className="bg-yellow-600 hover:bg-yellow-700 px-5 py-2 rounded-md"
            onClick={() => setShowPasswordModal(true)}
          >
            {t("profile.changePassword")}
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-semibold mb-4">
          {t("profile.accountMeta")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <div className="text-sm text-gray-400">{t("profile.userId")}</div>
            <div className="text-sm">{user?.userId}</div>
          </div>

          <div>
            <div className="text-sm text-gray-400">{t("profile.roles")}</div>
            <div className="text-sm">{user?.role}</div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          changePassword={changePassword}
        />
      )}
    </div>
  );
}
