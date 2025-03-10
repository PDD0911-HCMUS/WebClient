import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsFloranceV2RgComponent } from './ms-florance-v2-rg.component';

describe('MsFloranceV2RgComponent', () => {
  let component: MsFloranceV2RgComponent;
  let fixture: ComponentFixture<MsFloranceV2RgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MsFloranceV2RgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsFloranceV2RgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
