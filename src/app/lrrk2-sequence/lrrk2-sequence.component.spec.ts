import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lrrk2SequenceComponent } from './lrrk2-sequence.component';

describe('Lrrk2SequenceComponent', () => {
  let component: Lrrk2SequenceComponent;
  let fixture: ComponentFixture<Lrrk2SequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Lrrk2SequenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Lrrk2SequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
