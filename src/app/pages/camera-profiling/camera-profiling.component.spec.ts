import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraProfilingComponent } from './camera-profiling.component';

describe('CameraProfilingComponent', () => {
  let component: CameraProfilingComponent;
  let fixture: ComponentFixture<CameraProfilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraProfilingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraProfilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
