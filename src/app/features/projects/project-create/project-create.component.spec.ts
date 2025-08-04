import { ComponentFixture, TestBed } from "@angular/core/testing";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";

import { ProjectCreateComponent } from "./project-create.component";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("ProjectCreateComponent", () => {
  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCreateComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
