import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBodyComponent } from './data-body.component';

describe('DataBodyComponent', () => {
  let component: DataBodyComponent;
  let fixture: ComponentFixture<DataBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
