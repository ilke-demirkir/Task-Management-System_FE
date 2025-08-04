import { TestBed } from "@angular/core/testing";
import { CommentService } from "./comment.service";
import { jasmineExpect } from "../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
describe("CommentService", () => {
  let service: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CommentService);
  });

  it("should be created", () => {
    jasmineExpect(service).toBeTruthy();
  });
});
