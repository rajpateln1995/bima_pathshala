import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SanchalakComponent } from './sanchalak.component';


describe('SanchalakComponent', () => {
  let component: SanchalakComponent;
  let fixture: ComponentFixture<SanchalakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanchalakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanchalakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
