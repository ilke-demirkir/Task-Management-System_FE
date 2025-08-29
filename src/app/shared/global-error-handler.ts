import {
  ErrorHandler,
  inject,
  Injectable,
  Injector,
  isDevMode,
} from "@angular/core";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastService } from "./toast/toast.service";

@Injectable({ providedIn: "root" })
export class GlobalErrorHandler implements ErrorHandler {
  // inject() works at property level now
  private injector = inject(Injector);

  handleError(error: unknown): void {
    let userMessage = "An unexpected error occurred.";
    const router = this.injector.get(Router);
    const toastService = this.injector.get(ToastService);

    // 1) HTTP errors
    if (error instanceof HttpErrorResponse) {
      userMessage = this.handleHttpError(error);

      // 2) Client-side / runtime errors
    } else if (error instanceof Error) {
      userMessage = error.message;

      // 3) String errors
    } else if (typeof error === "string") {
      userMessage = error;
    }

    // Show it
    toastService.show(userMessage, "error");

    // Log it (console or remote)
    if (isDevMode()) {
      console.error("🛑 GlobalErrorHandler caught:", error);
    } else {
      // send to your logging endpoint
      // e.g. this.loggingService.logError(error);
    }
  }

  private handleHttpError(err: HttpErrorResponse): string {
    const router = this.injector.get(Router);

    // Network down
    if (err.status === 0) {
      return "Network error — please check your connection.";
    }

    // Unauthorized / Forbidden
    if (err.status === 401 || err.status === 403) {
      // clear tokens/session if needed
      router.navigate(["/login"]);
      return "Session expired. Please log in again.";
    }

    // Validation errors (400 with a structured payload)
    if (err.status === 400 && err.error && typeof err.error === "object") {
      const valMsg = this.extractFirstValidationError(err.error);
      if (valMsg) return valMsg;
    }

    // Server-sent string or message field
    if (typeof err.error === "string") {
      return err.error;
    }
    if (err.error?.message) {
      return err.error.message;
    }

    // Fallback by status code
    switch (err.status) {
      case 404:
        return "Requested resource not found.";
      case 500:
        return "Server error — please try again later.";
      default:
        return `Error ${err.status}: ${err.statusText || err.message}`;
    }
  }

  private extractFirstValidationError(errorObj: any): string | null {
    // look for { errors: { field: [ msgs ] } } or { errors: [ msgs ] }
    if (Array.isArray(errorObj?.errors) && errorObj.errors.length) {
      return errorObj.errors[0];
    }
    if (typeof errorObj.errors === "object") {
      for (const field of Object.keys(errorObj.errors)) {
        const msgs = errorObj.errors[field];
        if (Array.isArray(msgs) && msgs.length) {
          return msgs[0];
        }
      }
    }
    return null;
  }
}
