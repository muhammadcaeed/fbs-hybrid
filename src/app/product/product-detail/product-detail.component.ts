import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SigningService } from '../../services/signing.service';
import { environment } from '../../../environments/environment';
import _ from 'lodash';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  user;
  productId;
  article;
  params;
  existInWishlist = false;
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private signingService: SigningService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.title.setTitle('Product Details - Fulda Buy & Sell');
    this.productId = this.route.snapshot.params.id;
    this.signingService.getProduct(this.productId)
      .subscribe(
        result => {
          console.log(result);
          if (result['status']) {
            this.article = result['product'];
            this.article.product_id = result['product']['_id'];
            // this.article.image_path = environment.apiUrl + '/' + this.article.image_path;
            if (this.user && this.user.role && this.user.role !== 'seller') {
              this.article.buyer_id = this.user._id;
              this.params = _.pick(this.article, ['seller_id', 'buyer_id', 'product_id']);
              this.exist();
            }
          }
          else {
            this.signingService.presentToast('Product not found');
          }
        },
        err => this.signingService.presentToast(err['error']['message'])
        );
  }
  addToWishlist() {
    if (this.existInWishlist) {
      return;
    }
    this.signingService.addToWishlist(this.params)
      .subscribe(
        result => {
          console.log(result);
          this.exist();
        },
        err => console.log(err)
      );
  }

  exist() {
    this.signingService.exist(this.params)
      .subscribe(
        exist => {
          if (exist['count'] && exist['count'] > 0) {
            this.existInWishlist = true;
          }
        },
        err => console.log(err)
      );
  }

  visitProfile() {
    console.log(this.article);
    this.router.navigate(['/profile', {id: this.article.seller_id}]);
  }
}
