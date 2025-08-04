import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AttachmentListComponent } from "./attachment-list.component";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("AttachmentListComponent", () => {
  let component: AttachmentListComponent;
  let fixture: ComponentFixture<AttachmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AttachmentListComponent,
      ],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
