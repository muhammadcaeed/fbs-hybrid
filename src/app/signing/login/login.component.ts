import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  message;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService
    ) {
      this.form = fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
    }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  login() {
    console.log(this.form);

    this.signingService.loginUser(this.form.value)
      .subscribe(
        result => {
          console.log(result);
          this.form.reset();
          this.message = result['message'];
          if (result['status']) {
            localStorage.setItem('user', JSON.stringify(result['user']));
            setTimeout(() => {
              this.message = null;
              // this.router.navigate(['']);
              window.location.href = '/';
            }, 2000);
          }
        },
        err => {
          this.message = err.error.message;
        }
      );
  }

  ngOnInit() {
  }

}
