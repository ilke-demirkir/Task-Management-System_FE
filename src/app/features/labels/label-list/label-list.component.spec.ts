import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LabelListComponent } from "./label-list.component";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("LabelListComponent", () => {
  let component: LabelListComponent;
  let fixture: ComponentFixture<LabelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelListComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
