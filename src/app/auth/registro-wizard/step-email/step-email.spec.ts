import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepEmail } from './step-email';

describe('StepEmail', () => {
  let component: StepEmail;
  let fixture: ComponentFixture<StepEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
