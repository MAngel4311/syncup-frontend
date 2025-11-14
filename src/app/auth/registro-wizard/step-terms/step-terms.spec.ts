import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTerms } from './step-terms';

describe('StepTerms', () => {
  let component: StepTerms;
  let fixture: ComponentFixture<StepTerms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepTerms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepTerms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
