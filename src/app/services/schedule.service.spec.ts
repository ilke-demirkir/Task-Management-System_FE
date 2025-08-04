import { TestBed } from "@angular/core/testing";
import { ScheduleService } from "./schedule.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
describe("ScheduleService", () => {
  let service: ScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ScheduleService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
