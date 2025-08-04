import { TestBed } from "@angular/core/testing";
import { NotificationService } from "./notification.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("NotificationService", () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(NotificationService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
