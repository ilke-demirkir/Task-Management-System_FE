import { ApplicationRef, ComponentRef, Injectable, Injector, createComponent, inject } from '@angular/core';
import { ToastComponent } from './toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);

  private toasts: ComponentRef<ToastComponent>[] = [];

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', durationMs = 3000) {
    const toastRef = createComponent(ToastComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });
    toastRef.instance.message = message;
    toastRef.instance.type = type;
    toastRef.instance.durationMs = durationMs;
    toastRef.instance.closed.subscribe(() => this.removeToast(toastRef));

    document.body.appendChild(toastRef.location.nativeElement);
    this.appRef.attachView(toastRef.hostView);
    this.toasts.push(toastRef);
  }

  private removeToast(toastRef: ComponentRef<ToastComponent>) {
    this.appRef.detachView(toastRef.hostView);
    toastRef.location.nativeElement.remove();
    toastRef.destroy();
    this.toasts = this.toasts.filter(t => t !== toastRef);
  }
} 