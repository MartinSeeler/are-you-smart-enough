import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createHash } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashJti = (jti: string) => {
  const salt = process.env.JTI_SALT;
  return createHash("sha256")
    .update(jti + salt)
    .digest("hex");
};
