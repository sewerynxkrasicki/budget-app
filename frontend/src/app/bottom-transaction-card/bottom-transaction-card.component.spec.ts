import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomTransactionCardComponent } from './bottom-transaction-card.component';

describe('BottomTransactionCardComponent', () => {
  let component: BottomTransactionCardComponent;
  let fixture: ComponentFixture<BottomTransactionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomTransactionCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomTransactionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
