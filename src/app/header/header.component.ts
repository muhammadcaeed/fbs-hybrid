import { Component, OnInit } from '@angular/core';
import { SigningService } from '../services/signing.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user;
  keyword;
  searchKeyword: any;

  constructor(
    private signingService: SigningService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.keyword = this.route.snapshot.params.name;
    const url = this.router.url;
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    if (url.search('wishlist') !== -1) {
      if ((this.user && this.user.role === 'seller') || !this.user) {
        this.router.navigate(['']);
      }
    }
    if (url.search('product-create') !== -1) {
      if ((this.user && this.user.role === 'buyer') || !this.user) {
        this.router.navigate(['']);
      }
    }
    if (!this.user && url.search('profile') !== -1) {
        this.router.navigate(['']);
    }

    if (this.user && (url.search('login') !== -1 || url.search('register') !== -1 || url.search('forgot-password') !== -1)) {
        this.router.navigate(['']);
    }
  }

  wishlist() {
    const url = this.router.url;
    if (url.search('wishlist') === -1) {
      this.router.navigate(['wishlist']);
    }
    else {
      this.router.navigate(['refresh', {route: 'wishlist'}]);
    }
  }
  profile() {
    const url = this.router.url;
    if (url.search('profile') === -1) {
      this.router.navigate(['profile', {id: this.user._id}]);
    }
    else {
      this.router.navigate(['refresh', {route: 'profile', id: this.user._id}]);
    }
  }

  allProducts() {
    const url = this.router.url;
    if (url.search('product-listing') === -1) {
      this.router.navigate(['product-listing']);
    }
    else {
      this.router.navigate(['refresh', {route: 'product-listing'}]);
    }
  }

  searchProducts() {
    let params;
    if (!this.searchKeyword) {
      params = {};
    }
    else {
      params = { name: this.searchKeyword }
    }
    const url = this.router.url;
    if (url.search('product-listing') === -1) {
      this.router.navigate(['product-listing', params]);
    }
    else {
      params.route = 'product-listing';
      this.router.navigate(['refresh', params]);
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }
}
