import { TestBed } from "@angular/core/testing";
import { AttachmentService } from "./attachment.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("AttachmentService", () => {
  let service: AttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AttachmentService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
