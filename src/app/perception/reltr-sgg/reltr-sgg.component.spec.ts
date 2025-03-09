import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelTRSggComponent } from './reltr-sgg.component';

describe('RelTRSggComponent', () => {
  let component: RelTRSggComponent;
  let fixture: ComponentFixture<RelTRSggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelTRSggComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelTRSggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
