import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";

const baseFieldClasses =
  "w-full rounded-lg border bg-white/70 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:bg-gray-900/40 dark:text-gray-100 dark:placeholder:text-gray-500";

type FieldWrapperProps = {
  label: string;
  error?: string;
  hint?: string;
  id?: string;
};

function FieldMessage({
  id,
  error,
  hint,
}: {
  id: string;
  error?: string;
  hint?: string;
}) {
  if (error)
    return (
      <p
        id={`${id}-error`}
        className="mt-1.5 text-xs text-red-600 dark:text-red-400"
      >
        {error}
      </p>
    );
  if (hint)
    return (
      <p
        id={`${id}-hint`}
        className="mt-1.5 text-xs text-gray-400 dark:text-gray-500"
      >
        {hint}
      </p>
    );
  return null;
}

export const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> &
    FieldWrapperProps & { icon?: LucideIcon; endAdornment?: ReactNode }
>(
  (
    { label, error, hint, id, className, icon: Icon, endAdornment, ...props },
    ref,
  ) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <div>
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 start-0 flex w-9 items-center justify-center">
              <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined
            }
            className={clsx(
              baseFieldClasses,
              Icon && "ps-9",
              endAdornment && "pe-10",
              error
                ? "border-red-400 dark:border-red-500/60"
                : "border-gray-200 dark:border-gray-700",
              className,
            )}
            {...props}
          />
          {endAdornment && (
            <div className="absolute inset-y-0 end-0 flex w-9 items-center justify-center">
              {endAdornment}
            </div>
          )}
        </div>
        <FieldMessage id={fieldId} error={error} hint={hint} />
      </div>
    );
  },
);

export const SelectField = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> &
    FieldWrapperProps & { children: React.ReactNode }
>(({ label, error, hint, id, className, children, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <div>
      <label
        htmlFor={fieldId}
        className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <select
        ref={ref}
        id={fieldId}
        aria-invalid={!!error}
        className={clsx(baseFieldClasses, "cursor-pointer", className)}
        {...props}
      >
        {children}
      </select>
      <FieldMessage id={fieldId} error={error} hint={hint} />
    </div>
  );
});
SelectField.displayName = "SelectField";

export const CheckboxField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label: string }
>(({ label, id, className, ...props }, ref) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <label
      htmlFor={fieldId}
      className="flex cursor-pointer select-none items-center gap-2.5"
    >
      <input
        ref={ref}
        id={fieldId}
        type="checkbox"
        className={clsx(
          "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500/50 dark:border-gray-600 dark:bg-gray-800",
          className,
        )}
        {...props}
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
});
CheckboxField.displayName = "CheckboxField";
