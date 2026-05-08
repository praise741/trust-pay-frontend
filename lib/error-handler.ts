import { toast } from "sonner";
import type { AxiosError } from "axios";

export interface ApiError {
  error?: string;
  detail?: string;
  message?: string;
  non_field_errors?: string[];
  [key: string]: string | string[] | undefined;
}

function joinMessages(...values: (string | string[] | undefined)[]): string {
  return values
    .flatMap((v) => (Array.isArray(v) ? v : v ? [v] : []))
    .join(" ");
}

export function getErrorMessage(error: unknown, fallback = "An unexpected error occurred"): string {
  if (typeof error === "string") return error;

  const axiosError = error as AxiosError<ApiError>;

  if (!axiosError.response) {
    if (axiosError.message) return axiosError.message;
    return fallback;
  }

  const { status, data } = axiosError.response;

  if (status === 401) {
    return "Session expired. Please log in again.";
  }

  if (status === 403) {
    return "You don't have permission to perform this action.";
  }

  if (status === 404) {
    return "The requested resource was not found.";
  }

  if (status === 502) {
    return "Payment service is temporarily unavailable. Please try again later.";
  }

  if (status >= 500) {
    return "Server error. Please try again later.";
  }

  if (!data) {
    return `Request failed with status ${status}`;
  }

  const d = data as ApiError;

  if ("detail" in d && d.detail) {
    return String(d.detail);
  }

  if ("error" in d && d.error) {
    return String(d.error);
  }

  if ("message" in d && d.message) {
    return String(d.message);
  }

  if ("non_field_errors" in d && d.non_field_errors) {
    return joinMessages(d.non_field_errors);
  }

  // Handle Django validation errors (field-level)
  const all: string[] = [];
  for (const val of Object.values(d)) {
    if (Array.isArray(val)) {
      all.push(...val);
    } else if (typeof val === "string") {
      all.push(val);
    }
  }
  if (all.length > 0) return all.join(" ");

  return fallback;
}

export function handleApiError(error: unknown, fallback = "An unexpected error occurred"): void {
  const message = getErrorMessage(error, fallback);
  toast.error(message);
}
