import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// If you later have an update profile API, you can create a react-query mutation here
// import { useUpdateProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave() {
    // TODO: connect to backend later (update profile mutation)
    setIsEditing(false);
    toast.success("Profile updated");
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("profile") || "Profile"}</h1>
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
          onClick={logout}
        >
          {t("logout") || "Logout"}
        </button>
      </header>

      <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">
          {t("accountInformation") || "Account Information"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">{t("firstName")}</label>
            <input
              name="firstName"
              disabled={!isEditing}
              value={form.firstName}
              onChange={handleChange}
              className="bg-gray-700 px-3 py-2 rounded-md"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">{t("lastName")}</label>
            <input
              name="lastName"
              disabled={!isEditing}
              value={form.lastName}
              onChange={handleChange}
              className="bg-gray-700 px-3 py-2 rounded-md"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">{t("email")}</label>
            <input
              name="email"
              disabled
              value={form.email}
              className="bg-gray-800/60 px-3 py-2 rounded-md text-gray-400"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm">{t("phone")}</label>
            <input
              name="phone"
              disabled={!isEditing}
              value={form.phone}
              onChange={handleChange}
              className="bg-gray-700 px-3 py-2 rounded-md"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 mt-6">
          {!isEditing ? (
            <button
              className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              {t("editProfile") || "Edit Profile"}
            </button>
          ) : (
            <>
              <button
                className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md"
                onClick={() => {
                  setIsEditing(false);
                  setForm({
                    firstName: user?.firstName || "",
                    lastName: user?.lastName || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                  });
                }}
              >
                {t("cancel") || "Cancel"}
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md"
                onClick={handleSave}
              >
                {t("saveChanges") || "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Additional Card — User Metadata */}
      <div className="bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10">
        <h2 className="text-xl font-semibold mb-4">
          {t("accountMeta") || "Account Meta"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
          <div>
            <div className="text-sm text-gray-400">{t("userId")}</div>
            <div className="text-sm">{user?.userId}</div>
          </div>

          <div>
            <div className="text-sm text-gray-400">{t("role")}</div>
            <div className="text-sm">{user?.role}</div>
          </div>

          <div>
            <div className="text-sm text-gray-400">{t("createdAt")}</div>
            <div className="text-sm">{user?.createdAt}</div>
          </div>

          <div>
            <div className="text-sm text-gray-400">{t("updatedAt")}</div>
            <div className="text-sm">{user?.updatedAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
