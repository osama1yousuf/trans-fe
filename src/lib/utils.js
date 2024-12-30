import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const dateFormater = (e) => {
  const dateParts = e.split("/");
  const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
  const formattedDate =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");
  return formattedDate;s
};
