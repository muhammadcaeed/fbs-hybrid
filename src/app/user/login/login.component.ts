import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form;
  message;
  showSpinner: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
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
    this.showSpinner = true;
    this.userService.loginUser(this.form.value)
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
        },
        () => this.showSpinner = false
      );
  }
}
