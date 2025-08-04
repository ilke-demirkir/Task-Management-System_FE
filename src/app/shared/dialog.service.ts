import { ApplicationRef, ComponentRef, Injectable, Injector, createComponent, inject } from '@angular/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  openConfirmation(options: { title?: string; message?: string }): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      // Dynamically create the dialog component
      const componentRef: ComponentRef<ConfirmationDialogComponent> = createComponent(ConfirmationDialogComponent, {
        environmentInjector: this.appRef.injector,
        elementInjector: this.injector,
      });

      // Set inputs
      if (options.title) componentRef.instance.title = options.title;
      if (options.message) componentRef.instance.message = options.message;

      // Listen for confirm/cancel
      const cleanup = () => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.location.nativeElement.remove();
        componentRef.destroy();
      };
      componentRef.instance.confirm.subscribe(() => {
        resolve(true);
        cleanup();
      });
      componentRef.instance.cancel.subscribe(() => {
        resolve(false);
        cleanup();
      });

      // Add to DOM
      document.body.appendChild(componentRef.location.nativeElement);
      this.appRef.attachView(componentRef.hostView);
    });
  }
} 