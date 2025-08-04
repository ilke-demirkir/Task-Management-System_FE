import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TenantCreateComponent } from "./tenant-create.component";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("TenantCreateComponent", () => {
  let component: TenantCreateComponent;
  let fixture: ComponentFixture<TenantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantCreateComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TenantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
