import { useEffect, useState } from "react";
import {
  useProfile,
  useUpdateProfile,
  useChangePassword,
  useUploadProfilePhoto,
} from "@/hooks/useProfile";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Camera, Pencil, X, Save, KeyRound, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import PasswordModal from "@/components/PasswordModal";
import Avatar from "@/components/Profile/Avatar";
import { TextField, SelectField } from "@/components/UI/FormFields";
import { Role } from "@/api";
import { UserResponseDto } from "@/api/models/auth/UserResponseDto";

const formatRoleName = (role: string): string => {
  const roleMap: { [key in Role]: string } = {
    [Role.VIEWER]: "Viewer",
    [Role.TEST]: "Test",
    [Role.ENGINEER]: "Engineer",
    [Role.ADMIN]: "Admin",
    [Role.SUPER_ADMIN]: "Super-Admin",
  };
  return roleMap[role as Role] || role;
};

const READ_ONLY_FIELDS: (keyof UserResponseDto)[] = [
  "email",
  "userId",
  "isActive",
  "createdAt",
  "updatedAt",
];

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

  useEffect(() => {
    if (user) {
      setForm({
        userId: user?.userId || "unknown",
        email: user?.email || "unknown",
        username: user?.username || "unknown",
        firstName: user?.firstName || "unknown",
        lastName: user?.lastName || "unknown",
        photoUrl: user?.photoUrl || "unknown",
        isActive: user?.isActive || false,
        roles: user?.roles || [],
        createdAt: user?.createdAt || "unknown",
        updatedAt: user?.updatedAt || "unknown",
      });
    }
  }, [user]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRolesChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );
    const validRoles: Role[] = selectedOptions.filter((role): role is Role =>
      Object.values(Role).includes(role as Role),
    );
    setForm({ ...form, roles: validRoles });
  }

  function resetForm() {
    if (!user) return;
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

  async function handleSave() {
    updateProfile.mutate(form, {
      onSuccess: () => {
        toast.success(t("profileUpdated"));
        setIsEditing(false);
        logout();
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

  const roleOptions = Object.values(Role);

  return (
    <div className="relative space-y-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 start-1/3 -z-10 h-72 w-72 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t("profile.title")}
        </h1>
      </header>

      {/* Profile Card */}
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-8">
        {/* Photo */}
        <div className="mb-6 flex items-center gap-4 border-b border-gray-200/70 pb-6 dark:border-gray-700/50">
          <div className="relative">
            {user?.photoUrl && user.photoUrl !== "unknown" ? (
              <img
                src={user.photoUrl}
                alt=""
                className="h-20 w-20 rounded-full border-2 border-white/60 object-cover shadow-sm dark:border-white/10"
              />
            ) : (
              <Avatar username={user?.username} size="lg" />
            )}
            <label className="absolute -bottom-1 -end-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-colors hover:bg-indigo-700">
              {uploadPhoto.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Camera className="h-3.5 w-3.5" />
              )}
              <input
                type="file"
                className="hidden"
                onChange={handlePhotoUpload}
                accept="image/*"
              />
            </label>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              {user?.username}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("profile.changePhoto")}
            </p>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {(Object.keys(form) as Array<keyof UserResponseDto>)
            .filter((field) => field !== "roles")
            .map((field) => (
              <TextField
                key={field}
                name={field}
                label={t("profile." + field)}
                disabled={!isEditing || READ_ONLY_FIELDS.includes(field)}
                defaultValue={user ? user[field]?.toString() : "null"}
                onChange={handleChange}
              />
            ))}

          <SelectField
            label={t("profile.roles")}
            name="role"
            value={form.roles?.[0] || ""}
            onChange={handleRolesChange}
            disabled={!isEditing}
          >
            <option value="">{t("profile.selectRole", "Select a role")}</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {formatRoleName(role)}
              </option>
            ))}
          </SelectField>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 border-t border-gray-200/70 pt-6 dark:border-gray-700/50 sm:flex-row sm:items-center sm:justify-between">
          {!isEditing ? (
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <Pencil className="h-4 w-4" />
              {t("profile.edit")}
            </motion.button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  resetForm();
                }}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
                {t("common.cancel")}
              </button>
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                disabled={updateProfile.isPending}
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                {updateProfile.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {t("common.saveChanges")}
              </motion.button>
            </div>
          )}

          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50/80 px-5 py-2.5 text-sm font-medium text-amber-700 backdrop-blur-sm transition-colors hover:bg-amber-100 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"
          >
            <KeyRound className="h-4 w-4" />
            {t("profile.changePassword")}
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="rounded-2xl border border-white/40 bg-white/60 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/50 sm:p-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {t("profile.accountMeta")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("profile.userId")}
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {user?.userId}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("profile.roles")}
            </p>
            <p className="font-medium text-gray-900 dark:text-white">
              {user?.roles
                ?.map((role: Role) => formatRoleName(role))
                .join(", ") || t("profile.noRoles", "No roles")}
            </p>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          changePassword={changePassword.mutate}
        />
      )}
    </div>
  );
}
