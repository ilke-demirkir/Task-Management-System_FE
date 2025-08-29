import { ApplicationConfig } from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { jwtInterceptor } from "./services/jwt.interceptor";
import { ErrorHandler, isDevMode } from "@angular/core";
import { GlobalErrorHandler } from "./shared/global-error-handler";
import { LoadingInterceptor } from "./shared/loading-spinner/loading.interceptor";
import { provideServiceWorker } from "@angular/service-worker";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { AuthInterceptor } from "./shared/auth-interceptor";
import { provideAnimations } from "@angular/platform-browser/animations";
import { TenantHeaderInterceptor } from "./shared/tenant-header.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptor]),
      withInterceptorsFromDi(),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TenantHeaderInterceptor,
      multi: true,
    },
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    provideAnimations(),
  ],
};
