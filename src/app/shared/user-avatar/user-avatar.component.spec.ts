import { ComponentFixture, TestBed } from '@angular/core/testing';
import { jasmineExpect } from '../testing/jasmine-expect';

import { UserAvatarComponent } from './user-avatar.component';

describe('UserAvatarComponent', () => {
  let component: UserAvatarComponent;
  let fixture: ComponentFixture<UserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    jasmineExpect(component).toBeTruthy();
  });
});
