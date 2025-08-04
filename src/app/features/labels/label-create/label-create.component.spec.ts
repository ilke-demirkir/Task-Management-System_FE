import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LabelCreateComponent } from "./label-create.component";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("LabelCreateComponent", () => {
  let component: LabelCreateComponent;
  let fixture: ComponentFixture<LabelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelCreateComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
