import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TenantDetailComponent } from "./tenant-detail.component";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("TenantDetailComponent", () => {
  let component: TenantDetailComponent;
  let fixture: ComponentFixture<TenantDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => null }) },
        },
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TenantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
