type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  if (process.env.NODE_ENV === "test") return;

  const payload = meta ? { message, ...meta } : { message };
  const fn =
    level === "error"
      ? console.error
      : level === "warn"
        ? console.warn
        : console.info;

  fn(`[${level.toUpperCase()}]`, JSON.stringify(payload));
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) =>
    log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) =>
    log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) =>
    log("error", message, meta),
};
