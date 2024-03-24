import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconsResultsComponent } from './beacons-results.component';

describe('BeaconsResultsComponent', () => {
  let component: BeaconsResultsComponent;
  let fixture: ComponentFixture<BeaconsResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeaconsResultsComponent]
    });
    fixture = TestBed.createComponent(BeaconsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
