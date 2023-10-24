import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannersLandMapComponent } from './scanners-land-map.component';

describe('ScannersLandMapComponent', () => {
  let component: ScannersLandMapComponent;
  let fixture: ComponentFixture<ScannersLandMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScannersLandMapComponent]
    });
    fixture = TestBed.createComponent(ScannersLandMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
