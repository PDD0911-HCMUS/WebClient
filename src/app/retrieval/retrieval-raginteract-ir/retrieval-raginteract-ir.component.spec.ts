import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalRAGInteractIRComponent } from './retrieval-raginteract-ir.component';

describe('RetrievalRAGInteractIRComponent', () => {
  let component: RetrievalRAGInteractIRComponent;
  let fixture: ComponentFixture<RetrievalRAGInteractIRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetrievalRAGInteractIRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetrievalRAGInteractIRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
