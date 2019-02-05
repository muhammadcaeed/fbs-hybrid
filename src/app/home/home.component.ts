import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles = [];
  showSpinner: Boolean = true;
  noProducts: Boolean = false;

  constructor(
    private title: Title,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Home - Fulda Buy & Sell');
    this.latestProducts();
  }

  latestProducts() {
    this.productService.latestProducts()
      .subscribe(result => {
        this.articles = result['products'];
        if (!this.articles.length) {
          this.noProducts = true;
        }
      }, err => {
        this.noProducts = true;
        console.log(err);
      },
      () => this.showSpinner = false );
  }
  productDetails(id) {
    this.router.navigate(['product-detail', {id: id}]);
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
}
