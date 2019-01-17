import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'form-tests';

  methods = ['paypal', 'other'];

  form: FormGroup = new FormGroup({
    method: new FormControl('paypal', {
      validators: [Validators.required]
    }),
    paypal: new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    }),
    other: new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    })
  });
}
