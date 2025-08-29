import { HttpInterceptorFn } from "@angular/common/http";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("jwt_token");
  console.log("[JWT Interceptor] token from localStorage:", token);

  // decide whether to clone
  if (token && !req.url.includes("/api/auth/")) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    console.log(
      "[JWT Interceptor] sending headers:",
      cloned.headers.keys(),
      cloned.headers.get("Authorization"),
    );
    return next(cloned);
  }

  console.log("[JWT Interceptor] no token or skipping auth URL");
  return next(req);
};
