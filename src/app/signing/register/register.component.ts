import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService
    ) {
      this.form = fb.group({
        role: ['', [Validators.required]],
        name: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.email]],
        mobile_number: ['', []],
        address: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }

  get role() { return this.form.get('role'); }
  get name() { return this.form.get('name'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get address() { return this.form.get('address'); }
  get password() { return this.form.get('password'); }

  register() {
    this.signingService.registerUser(this.form.value)
      .subscribe(
        result => {
          console.log(result);
          if (result['status']) {
            this.form.reset();
          }
          this.signingService.presentToast(result['message']);
        },
        err => {
          this.signingService.presentToast(err['error']['message']);
        }
      );
  }

}
