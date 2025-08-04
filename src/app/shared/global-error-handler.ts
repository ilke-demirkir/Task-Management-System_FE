import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { ToastService } from './toast/toast.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  private injector = inject(Injector);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  handleError(error: any): void {
    const toastService = this.injector.get(ToastService);
    let message = 'An unexpected error occurred.';

    // HTTP error with status
    if (error && error.status) {
      if (error.status === 401 || error.status === 403) {
        message = 'Session expired. Please log in again.';
      } else if (error.status === 0) {
        message = 'Network error. Please check your connection.';
      } else if (error.status === 400 && error.error && typeof error.error === 'object') {
        // Validation error: show first message or summary
        const validationMsg = this.extractValidationMessage(error.error);
        if (validationMsg) message = validationMsg;
      } else if (error.error && typeof error.error === 'string') {
        message = error.error;
      } else if (error.error && error.error.message) {
        message = error.error.message;
      } else if (error.message) {
        message = error.message;
      }
    } else if (error && typeof error === 'object') {
      if (error.message) {
        message = error.message;
      } else if (error.error && typeof error.error === 'string') {
        message = error.error;
      } else if (error.error && error.error.message) {
        message = error.error.message;
      }
    } else if (typeof error === 'string') {
      message = error;
    }

    toastService.show(message, 'error');
    // Optionally log to console or remote server
    console.error(error);
  }

  private extractValidationMessage(errorObj: any): string | null {
    if (!errorObj) return null;
    if (Array.isArray(errorObj.errors) && errorObj.errors.length > 0) {
      return errorObj.errors[0];
    }
    if (typeof errorObj === 'object') {
      for (const key of Object.keys(errorObj)) {
        if (Array.isArray(errorObj[key]) && errorObj[key].length > 0) {
          return errorObj[key][0];
        }
      }
    }
    return null;
  }
} 