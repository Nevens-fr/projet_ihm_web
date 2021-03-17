import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotrComponent } from './lotr.component';

describe('LotrComponent', () => {
  let component: LotrComponent;
  let fixture: ComponentFixture<LotrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
