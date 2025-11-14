import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPassword } from './step-password';

describe('StepPassword', () => {
  let component: StepPassword;
  let fixture: ComponentFixture<StepPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
