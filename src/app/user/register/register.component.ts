import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form;
  showSpinner: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService
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
    this.showSpinner = true;
    this.userService.registerUser(this.form.value)
      .subscribe(
        result => {
          console.log(result);
          if (result['status']) {
            this.form.reset();
          }
          this.toastService.presentToast(result['message']);
        },
        err => {
          this.toastService.presentToast(err['error']['message']);
        },
        () => this.showSpinner = false
      );
  }

}
