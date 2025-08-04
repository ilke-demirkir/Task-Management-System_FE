import { TestBed } from "@angular/core/testing";
import { DashboardComponent } from "./dashboard.component";
import { jasmineExpect } from "../../shared/testing/jasmine-expect";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter } from "@angular/router";

describe("DashboardComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        provideRouter([]),
      ],
    }).compileComponents();
  });

  it("should create the dashboard component", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    jasmineExpect(dashboard).toBeTruthy();
  });

  it("should render greeting", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    jasmineExpect(compiled.textContent?.toLowerCase()).toContain(
      "welcome back",
    );
  });

  it("should render projects section", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    jasmineExpect(compiled.textContent?.toLowerCase()).toContain("my projects");
  });

  it("should render upcoming tasks section", () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    jasmineExpect(compiled.textContent?.toLowerCase()).toContain(
      "upcoming tasks",
    );
  });
});
