import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
