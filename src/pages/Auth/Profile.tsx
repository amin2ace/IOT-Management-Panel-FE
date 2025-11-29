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
import { UserResponseDto } from "@/api";

// Role enum (you can import this from your API types if available)
enum Role {
  VIEWER = "viewer",
  TEST = "test",
  ENGINEER = "engineer",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

// Helper function to format role display names
const formatRoleName = (role: string): string => {
  const roleMap: { [key in Role]: string } = {
    [Role.VIEWER]: "Viewer",
    [Role.TEST]: "Test",
    [Role.ENGINEER]: "Engineer",
    [Role.ADMIN]: "Admin",
    [Role.SUPER_ADMIN]: "Super Admin",
  };
  return roleMap[role as Role] || role;
};

export default function ProfilePage() {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const { data: user, refetch } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const uploadPhoto = useUploadProfilePhoto();

  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [form, setForm] = useState<UserResponseDto>({
    userId: "",
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    photoUrl: "",
    isActive: false,
    roles: [],
    createdAt: "",
    updatedAt: "",
  });

  React.useEffect(() => {
    if (user) {
      setForm({
        userId: user.userId || "unknown",
        email: user.email || "unknown",
        username: user.username || "unknown",
        firstName: user.firstName || "unknown",
        lastName: user.lastName || "unknown",
        photoUrl: user.photoUrl || "unknown",
        isActive: user.isActive || false,
        roles: user.roles || [],
        createdAt: user.createdAt || "unknown",
        updatedAt: user.updatedAt || "unknown",
      });
    }
  }, [user]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    logout();
  }

  function handleRolesChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    // Type guard to ensure only valid Role values are included
    const validRoles: Role[] = selectedOptions.filter((role): role is Role =>
      Object.values(Role).includes(role as Role)
    );

    setForm({ ...form, roles: validRoles });
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

  // Role options from the enum
  const roleOptions = Object.values(Role);

  return (
    <div className="dashboardProfileContainer">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{t("profile.title")}</h1>
      </header>

      {/* Profile Card */}
      <div className="profile-card">
        {/* Profile Photo */}
        <div className="profile-photo-section">
          <img
            src={user?.photoUrl || "/default-avatar.png"}
            className="profile-photo"
          />
          <label className="photo-upload-label">
            {t("profile.changePhoto")}
            <input
              type="file"
              className="photo-upload-input"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        {/* User Fields */}
        <div className="profile-form-grid">
          {Object.keys(form)
            .filter((field) => field !== "roles") // Exclude roles from regular inputs
            .map((field) => (
              <div key={field} className="profile-field">
                <label className="profile-label">{t("profile." + field)}</label>
                <input
                  name={field}
                  disabled={!isEditing || field === "email"}
                  value={field?.toString() || ""}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
            ))}

          {/* Role Dropdown Field */}
          <div className="profile-field">
            <label className="profile-label">{t("profile.role")}</label>
            {isEditing ? (
              <select
                name="role"
                value={form.roles || ""}
                onChange={handleRolesChange}
                className="profile-input"
              >
                <option value="">Select a role</option>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {formatRoleName(role)}
                  </option>
                ))}
              </select>
            ) : (
              <div className="profile-input bg-gray-100 dark:bg-gray-700 cursor-not-allowed">
                {form.roles
                  ? formatRoleName(form.roles[0])
                  : "No role assigned"}
              </div>
            )}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="profile-actions">
          {/* Edit / Save */}
          {!isEditing ? (
            <button
              className="profile-button-primary"
              onClick={() => setIsEditing(true)}
            >
              {t("profile.edit")}
            </button>
          ) : (
            <div className="profile-button-group">
              <button
                className="profile-button-secondary"
                onClick={() => {
                  setIsEditing(false);
                  if (user) {
                    setForm({
                      userId: user.userId || "unknown",
                      email: user.email || "unknown",
                      username: user.username || "unknown",
                      firstName: user.firstName || "unknown",
                      lastName: user.lastName || "unknown",
                      photoUrl: user.photoUrl || "unknown",
                      isActive: user.isActive || false,
                      roles: user.roles || [],
                      createdAt: user.createdAt || "unknown",
                      updatedAt: user.updatedAt || "unknown",
                    });
                  }
                }}
              >
                {t("common.cancel")}
              </button>
              <button className="profile-button-success" onClick={handleSave}>
                {t("common.saveChanges")}
              </button>
            </div>
          )}

          {/* Change Password */}
          <button
            className="profile-button-warning"
            onClick={() => setShowPasswordModal(true)}
          >
            {t("profile.changePassword")}
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="profile-metadata">
        <h2>{t("profile.accountMeta")}</h2>
        <div className="metadata-grid">
          <div className="metadata-item">
            <div className="metadata-label">{t("profile.userId")}</div>
            <div className="metadata-value">{user?.userId}</div>
          </div>
          <div className="metadata-item">
            <div className="metadata-label">{t("profile.roles")}</div>
            <div className="metadata-value">
              {user?.roles
                ?.map((role: Role) => formatRoleName(role))
                .join(", ") || "No roles"}
            </div>
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
