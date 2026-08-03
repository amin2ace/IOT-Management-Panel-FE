import clsx from "clsx";

type AvatarProps = {
  username?: string;
  size?: "sm" | "lg";
};

const sizeStyles = {
  sm: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-xl",
};

export default function Avatar({ username, size = "sm" }: AvatarProps) {
  const initial = username?.[0]?.toUpperCase() || "G";

  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm ring-2 ring-white/60 dark:ring-white/10",
        sizeStyles[size],
      )}
      aria-hidden="true"
    >
      {initial}
    </div>
  );
}
