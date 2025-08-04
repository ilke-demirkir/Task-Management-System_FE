import { ComponentFixture, TestBed } from "@angular/core/testing";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";

import { TaskCreateComponent } from "./task-create.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("TaskCreateComponent", () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreateComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
