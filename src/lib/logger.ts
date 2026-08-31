export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  userId?: string;
  requestId?: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, userId, requestId } = entry;
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    const metaStr =
      userId || requestId ? ` [${userId || ""}${requestId ? `:${requestId}` : ""}]` : "";
    return `[${timestamp}] ${level}${metaStr}: ${message}${contextStr}`;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    };
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      const entry = this.createLogEntry(LogLevel.DEBUG, message, context);
      console.debug(this.formatLog(entry));
    }
  }

  info(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.INFO, message, context);
    console.info(this.formatLog(entry));
  }

  warn(message: string, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.WARN, message, context);
    console.warn(this.formatLog(entry));
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    const entry = this.createLogEntry(LogLevel.ERROR, message, {
      ...context,
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name,
            }
          : error,
    });
    console.error(this.formatLog(entry));
  }
}

export const logger = new Logger();
