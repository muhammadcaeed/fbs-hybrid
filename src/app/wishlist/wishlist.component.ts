import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { WishlistService } from '../services/wishlist.service';
import { environment } from '../../environments/environment';
import _ from 'lodash';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  articles;
  orders;
  total = 0;
  user;
  constructor(
    private toastService: ToastService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.list();
    }
  }

  checkout() {
    const order = {
      buyer_id: this.user._id,
      total: this.total,
      wishlist: [],
      products: []
    };
    this.articles.forEach(article => {
      order.products.push(article.product_id);
      order.wishlist.push(article._id);
    });

    this.wishlistService.checkout(order)
      .subscribe(result => {
        console.log(result);
        this.toastService.presentToast(result['message']);
          this.list();
      }, 
      err => console.log(err));
  }

  list() {
    this.wishlistService.getWishlist(this.user._id)
    .subscribe(
      result => {
        this.articles = result['wishlist'];
        this.orders = result['orders'];
        console.log(this.orders);
        this.articles.forEach(article => {
          this.total += article.product_details.price;
        });

      },
      err => console.log(err)
      );
  }

  removeProduct(product) {
    product = _.pick(product, ['_id', 'seller_id', 'buyer_id', 'product_id']);
    console.log(product);
    this.wishlistService.removeProductFromWishlist(product)
      .subscribe(
        result => {
          this.total = 0;
          this.list();
        },
        err => console.log(err)
      )
  }

}
