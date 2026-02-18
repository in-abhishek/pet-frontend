"use client";

import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { EyeCloseIcon, EyeOpenIcon } from "../../assets/iconset";

interface InputProps {
  label?: string;
  type?: "text" | "password" | "search"  | string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
  helperText?: string;
  error?: string;
  className?: string;
  minValue?: number;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
  value = "",
  onChange,
  required = true,
  minLength,
  helperText,
  error,
  className,
  minValue,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(value, "value");
  }, [value]);

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-base font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          disabled={disabled}
          type={type === "password" && showPassword ? "text" : type}
          id={id}
          name={name}
          placeholder={placeholder}
          {...(type !== "file" ? { value } : {})}
          onChange={onChange}
          required={required}
          minLength={minLength}
          min={minValue}
          {...(type === "file" ? { accept: "image/png, image/jpeg" } : {})}
          className={`
            w-full px-4
            text-text-secondary bg-gray-50 h-11 border border-border shadow-xs rounded-lg
            placeholder:text-gray-500 focus:outline-none focus:ring-0
            ${className}
            ${disabled ? "bg-gray-300 text-black cursor-not-allowed opacity-70" : ""}
            ${error ? "border-red-500! bg-red-50!" : ""}
            ${type === "password" ? "pl-4 pr-8" : ""}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute cursor-pointer inset-y-0 right-3 flex items-center focus:outline-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeCloseIcon /> : <EyeOpenIcon />}
          </button>
        )}

      </div>

      {helperText && <p className="text-sm text-theme-blue mt-1.5">{helperText}</p>}
      {error && <p className="text-sm text-error mt-1">{error}</p>}
    </div>
  );
};
