import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageManagementComponent } from './page-management.component';

describe('PageManagementComponent', () => {
  let component: PageManagementComponent;
  let fixture: ComponentFixture<PageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
