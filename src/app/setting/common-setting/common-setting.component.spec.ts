import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSettingComponent } from './common-setting.component';

describe('CommonSettingComponent', () => {
  let component: CommonSettingComponent;
  let fixture: ComponentFixture<CommonSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
