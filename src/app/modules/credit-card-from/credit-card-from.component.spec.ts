import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardFromComponent } from './credit-card-from.component';
import { expect } from '@jest/globals';
import { provideMockStore } from '@ngrx/store/testing';
import { CreditCardState } from '../../core/state/state/credit-card.state';
import {
  selectCreditCard, selectCreditCardExpiration,
  selectCreditCardFeatureState,
  selectCreditCardHolder, selectCreditCardNumber, selectCreditCardVerification,
} from '../../core/state/selectors/credit-card.selectors';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CcVerificationService } from '../../core/services/cc-verification.service';

describe('CreditCardFromComponent', () => {
  let component: CreditCardFromComponent;
  let fixture: ComponentFixture<CreditCardFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardFromComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        CcVerificationService,
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

    fixture = TestBed.createComponent(CreditCardFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement).toMatchSnapshot();
  });
});
