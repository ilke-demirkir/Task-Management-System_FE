import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { jasmineExpect } from '../shared/testing/jasmine-expect';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();
  });

  it('should create the home component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const home = fixture.componentInstance;
    jasmineExpect(home).toBeTruthy();
  });

  it('should render welcome or hero section', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    jasmineExpect(compiled.textContent?.toLowerCase()).toContain('welcome');
  });

  it('should render feature or CTA section', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent?.toLowerCase() || '';
    jasmineExpect(text.includes('feature') || text.includes('get started') || text.includes('sign up')).toBeTruthy();
  });
});
