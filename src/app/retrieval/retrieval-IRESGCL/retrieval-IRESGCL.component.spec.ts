import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalIRESGCL } from './retrieval-IRESGCL.component';

describe('RetrievalIRESGCL', () => {
  let component: RetrievalIRESGCL;
  let fixture: ComponentFixture<RetrievalIRESGCL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetrievalIRESGCL]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetrievalIRESGCL);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
