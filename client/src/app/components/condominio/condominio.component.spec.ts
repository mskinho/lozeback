import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondominioComponent } from './condominio.component';

describe('CondominioComponent', () => {
  let component: CondominioComponent;
  let fixture: ComponentFixture<CondominioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondominioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondominioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
