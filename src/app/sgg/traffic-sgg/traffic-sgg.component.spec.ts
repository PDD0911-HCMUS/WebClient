import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficSggComponent } from './traffic-sgg.component';

describe('TrafficSggComponent', () => {
  let component: TrafficSggComponent;
  let fixture: ComponentFixture<TrafficSggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrafficSggComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrafficSggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
