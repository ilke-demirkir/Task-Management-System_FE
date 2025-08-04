import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ScheduleCreateComponent } from "./schedule-create.component";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("ScheduleCreateComponent", () => {
  let component: ScheduleCreateComponent;
  let fixture: ComponentFixture<ScheduleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleCreateComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
