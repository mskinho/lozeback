import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketcommentComponent } from './ticketcomment.component';

describe('TicketcommentComponent', () => {
  let component: TicketcommentComponent;
  let fixture: ComponentFixture<TicketcommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketcommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
