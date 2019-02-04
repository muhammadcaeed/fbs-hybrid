import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { SigningService } from '../services/signing.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id;
  user = {
    profile: {}
  };
  form;
  updated;
  isVisitor = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private signingService: SigningService,
    private toastService: ToastService
    ) {
      this.form = fb.group({
        role: ['', [Validators.required]],
        name: ['', [Validators.required]],
        username: ['', [Validators.required]],
        email: ['', [Validators.email]],
        mobile_number: ['', []],
        address: ['', [Validators.required]]
      });
      this.form.get('role').disable();
      this.form.get('username').disable();
      this.form.get('email').disable();
    }

  get role() { return this.form.get('role'); }
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get username() { return this.form.get('username'); }
  get address() { return this.form.get('address'); }
  get mobile_number() { return this.form.get('mobile_number'); }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (!this.id) {
      this.router.navigate(['']);
    }
    if (this.id !== JSON.parse(localStorage.getItem('user'))._id) {
      this.form.disable();
      this.isVisitor = true;
    }
    this.signingService.getUser(this.id)
      .subscribe(result => {
        this.user = result['user'];
        console.log(this.user);
        this.user['profile']['image_path'] = `${environment.apiUrl}/${this.user['profile']['image_path']}`;

        (<FormGroup>this.form)
        .setValue({
          role: result['user']['role'],
          username: result['user']['username'],
          email: result['user']['email'],
          name: result['user']['profile']['name'],
          address: result['user']['profile']['address'],
          mobile_number: result['user']['profile']['mobile_number'],
        });
      });
  }

  updateProfile() {
    const params = this.form.value;
    params.profile_id = this.user['profile']['_id'];
    params.user_id = this.user['_id'];
    this.signingService.updateUser(params)
      .subscribe(
        result => this.toastService.presentToast(result['message']),
        err => this.toastService.presentToast(err['error']['message'])
      );
  }
}
