import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AttachmentUploadComponent } from "./attachment-upload.component";
import { jasmineExpect } from "../../../shared/testing/jasmine-expect";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("AttachmentUploadComponent", () => {
  let component: AttachmentUploadComponent;
  let fixture: ComponentFixture<AttachmentUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentUploadComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AttachmentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    jasmineExpect(component).toBeTruthy();
  });
});
