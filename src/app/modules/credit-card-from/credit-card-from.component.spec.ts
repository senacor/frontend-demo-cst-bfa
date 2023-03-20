import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardFromComponent } from './credit-card-from.component';
import { expect } from '@jest/globals';

describe('CreditCardFromComponent', () => {
  let component: CreditCardFromComponent;
  let fixture: ComponentFixture<CreditCardFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardFromComponent ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreditCardFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
