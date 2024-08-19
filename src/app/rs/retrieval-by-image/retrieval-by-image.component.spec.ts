import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalByImageComponent } from './retrieval-by-image.component';

describe('RetrievalByImageComponent', () => {
  let component: RetrievalByImageComponent;
  let fixture: ComponentFixture<RetrievalByImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetrievalByImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetrievalByImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
