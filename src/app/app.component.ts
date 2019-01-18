import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-tests';

  methods = ['paypal', 'other'];

  form: FormGroup = new FormGroup(
    {
      method: new FormControl('paypal', {
        validators: [Validators.required]
      }),
      paypal: new FormGroup({
        email: new FormControl(null, {
          validators: [Validators.email]
        })
      }),
      other: new FormGroup({
        email: new FormControl(null, {
          validators: [Validators.email]
        })
      })
    },
    { validators: customValidator }
  );

  ngOnInit() {
    this.form.get('method').valueChanges.subscribe(() => {
      this.form
        .get('paypal')
        .get('email')
        .setValue(null);
      this.form
        .get('other')
        .get('email')
        .setValue(null);
    });
  }
}

export const customValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const method = control.get('method');
  const paypal = control.get('paypal').get('email');
  const other = control.get('other').get('email');

  if ((paypal.value && paypal.valid) || (other.value && other.valid)) {
    return null;
  } else {
    return { paymentSelectionInvalid: true };
  }
};
