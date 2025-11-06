'use client';

import { Sprout } from "lucide-react";

interface AgroIAAvatarProps {
  size?: "sm" | "md" | "lg";
  isTyping?: boolean;
}

export const AgroIAAvatar = ({ size = "md", isTyping = false }: AgroIAAvatarProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="relative">
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#1E4D2B] to-[#8FBC6D] flex items-center justify-center shadow-lg ${
          isTyping ? "animate-pulse" : ""
        }`}
      >
        <Sprout className={`${size === "sm" ? "h-4 w-4" : size === "md" ? "h-6 w-6" : "h-8 w-8"} text-white`} />
      </div>
      {isTyping && (
        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#1E4D2B] animate-ping" />
      )}
    </div>
  );
};
