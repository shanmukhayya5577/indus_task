import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingAgencyComponent } from './landing-agency.component';

describe('LandingAgencyComponent', () => {
  let component: LandingAgencyComponent;
  let fixture: ComponentFixture<LandingAgencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingAgencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
