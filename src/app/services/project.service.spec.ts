import { TestBed } from "@angular/core/testing";
import { ProjectService } from "./project.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
describe("ProjectService", () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
