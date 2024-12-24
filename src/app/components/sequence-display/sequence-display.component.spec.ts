import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceDisplayComponent } from './sequence-display.component';

describe('SequenceDisplayComponent', () => {
  let component: SequenceDisplayComponent;
  let fixture: ComponentFixture<SequenceDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequenceDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
