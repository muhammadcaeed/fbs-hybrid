import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  form;
  message;
  constructor( private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService) {
      this.form = fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  changePassword(){
    console.log(this.form);
    this.userService.changePassword(this.form.value)
    .subscribe(
      result => {
        this.form.reset();
        this.toastService.presentToast(result['message']);
      },
      err => {
        this.toastService.presentToast(err.error.message);
      }
    );
  }
}
