import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroWizard } from './registro-wizard';

describe('RegistroWizard', () => {
  let component: RegistroWizard;
  let fixture: ComponentFixture<RegistroWizard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroWizard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroWizard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
