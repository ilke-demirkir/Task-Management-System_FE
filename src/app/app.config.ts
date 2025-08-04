import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtInterceptor } from './services/jwt.interceptor';
import { ErrorHandler, isDevMode } from '@angular/core';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { LoadingInterceptor } from './shared/loading-spinner/loading.interceptor';
import { provideServiceWorker } from '@angular/service-worker';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }, provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
