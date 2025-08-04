import { TestBed } from "@angular/core/testing";
import { TenantService } from "./tenant.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
describe("TenantService", () => {
  let service: TenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TenantService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
