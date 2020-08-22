import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShishyaComponent } from './shishya.component';

describe('ShishyaComponent', () => {
  let component: ShishyaComponent;
  let fixture: ComponentFixture<ShishyaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShishyaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShishyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
