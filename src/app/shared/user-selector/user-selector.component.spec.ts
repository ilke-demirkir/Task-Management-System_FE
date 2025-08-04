import { ComponentFixture, TestBed } from "@angular/core/testing";
import { jExpect } from "../../../test-helpers";
import { UserSelectorComponent } from "./user-selector.component";
import { jasmineExpect } from "../testing/jasmine-expect";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

describe("UserSelectorComponent", () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelectorComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
