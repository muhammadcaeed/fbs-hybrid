import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  articles = [];
  showSpinner: Boolean = true;
  noProducts: Boolean = false;
  user;
  total = 0;
  approved = 0;
  sold = 0;
  constructor(
    private toastService: ToastService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.list();
  }

  list() {
    this.showSpinner = true;
    this.productService.sales({id: this.user._id})
    .subscribe(result => {
      console.log(result);
      if (result['body'] && result['body']['products'] && result['body']['products']['length'] > 0) {
        this.articles = result['body']['products'];
        this.articles.forEach(article => {
          article.approved ? this.approved ++ : null;
          article.sold ? this.sold ++ : null;
          article.sold ? this.total += article.price : null; 
        });
      }
      else {
        this.noProducts = true;
        this.toastService.presentToast('No sales yet');
      }
      if (result['body'] && !result['body']['status']) {
        this.noProducts = true;
        this.toastService.presentToast(result['body']['message']);
      }
    }, err => console.log(err),
    () => this.showSpinner = false);
  }
  
  removeProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe(
        result => {
          this.list();
        },
        err => console.log(err)
      );
  }
}
