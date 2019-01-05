import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form;
  message;
  constructor( private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService) {
      this.form = fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  ngOnInit() {
  }
  changePassword(){
    console.log(this.form);
    this.signingService.changePassword(this.form.value)
    .subscribe(
      result => {
        this.form.reset();
        this.message = result['message'];
      },
      err => {
        this.message = err.error.message;
      }
    );
  }
}
