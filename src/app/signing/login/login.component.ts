import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form;
  message;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService,
    private toastService: ToastService
    ) {
      this.form = fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  login() {
    this.signingService.loginUser(this.form.value)
      .subscribe(
        result => {
          console.log(result);
          this.form.reset();
          this.toastService.presentToast(result['message']);
          if (result['status']) {
            localStorage.setItem('user', JSON.stringify(result['user']));
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
        },
        err => {
          this.toastService.presentToast(err.error.message);
        }
      );
  }
}
