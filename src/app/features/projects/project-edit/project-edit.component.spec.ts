import { ComponentFixture, TestBed } from "@angular/core/testing";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";

import { ProjectEditComponent } from "./project-edit.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideRouter } from "@angular/router";

describe("ProjectEditComponent", () => {
  let component: ProjectEditComponent;
  let fixture: ComponentFixture<ProjectEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEditComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        provideRouter([]),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
