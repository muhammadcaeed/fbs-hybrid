import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { SigningService } from '../services/signing.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  products;
  users;
  activeLayer;
  isUserActive;
  message;
  constructor(
    private title: Title,
    private signingService: SigningService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.title.setTitle('Admin Panel - Fulda Buy & Sell');
    this.loadProducts();
    this.loadUsers();
  }
  action(record) {
    console.log(record);
    this.signingService.changeProductStatus(record)
      .subscribe(
        result => {
          console.log(result);
          this.loadProducts();
        },
        err => console.log(err),
      );
  }
  delete(id) {
    console.log(id);
    this.signingService[this.isUserActive ? 'deleteUser' : 'deleteProduct'](id)
      .subscribe(
        result => {
          console.log(result);
          if (result['status']) {
            this.message = result['message'];
            this.isUserActive
              ? this.loadUsers()
              : this.loadProducts();
            setTimeout(() => {
              this.message = null;
            }, 3000);
          }
        },
        err => console.log(err),
      );
  }

  loadProducts() {
    this.signingService.searchProducts({name: null, admin: true})
    .subscribe(
      result => {
        this.products = result.body['product'];
        this.activeLayer = this.products;
        this.isUserActive = false;
      },
      err => console.log('err => ', err)
    );
  }

  loadUsers() {
    this.signingService.searchUsers({name: null, admin: true})
    .subscribe(
      result => {
        console.log(result.body);
        this.users = result.body;
        this.activeLayer = this.users;
        this.isUserActive = true;
      },
      err => console.log('err => ', err)
    );
  }
}
