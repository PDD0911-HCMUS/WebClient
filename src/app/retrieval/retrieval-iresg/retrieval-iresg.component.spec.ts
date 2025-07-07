import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalIRESGComponent } from './retrieval-iresg.component';

describe('RetrievalIRESGComponent', () => {
  let component: RetrievalIRESGComponent;
  let fixture: ComponentFixture<RetrievalIRESGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetrievalIRESGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetrievalIRESGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
