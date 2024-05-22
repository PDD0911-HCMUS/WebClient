import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalTrafficComponent } from './retrieval-traffic.component';

describe('RetrievalTrafficComponent', () => {
  let component: RetrievalTrafficComponent;
  let fixture: ComponentFixture<RetrievalTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetrievalTrafficComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetrievalTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
