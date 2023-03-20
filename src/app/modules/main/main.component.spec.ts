import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { expect } from '@jest/globals';
import { provideMockStore } from '@ngrx/store/testing';
import { CreditCardState } from '../../core/state/state/credit-card.state';
import {
  selectCreditCard, selectCreditCardExpiration,
  selectCreditCardFeatureState,
  selectCreditCardHolder, selectCreditCardNumber, selectCreditCardVerification,
} from '../../core/state/selectors/credit-card.selectors';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [
        provideMockStore<CreditCardState>({
          selectors: [
            { selector: selectCreditCardFeatureState, value: undefined },
            { selector: selectCreditCard, value: undefined },
            { selector: selectCreditCardHolder, value: '' },
            { selector: selectCreditCardNumber, value: '' },
            { selector: selectCreditCardExpiration, value: '' },
            { selector: selectCreditCardVerification, value: '' },
          ],
        }),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
