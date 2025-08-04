import { TestBed } from "@angular/core/testing";
import { TaskService } from "./task.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
