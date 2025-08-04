import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LabelSelectorComponent } from "./label-selector.component";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("LabelSelectorComponent", () => {
  let component: LabelSelectorComponent;
  let fixture: ComponentFixture<LabelSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelSelectorComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()], 
    })
      .compileComponents();

    fixture = TestBed.createComponent(LabelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
