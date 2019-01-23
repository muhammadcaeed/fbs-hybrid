import { Component, OnInit } from '@angular/core';
import { SigningService } from '../services/signing.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss']
})
export class OrdersHistoryComponent implements OnInit {
  articles = [];
  user;
  total = 0;
  approved = 0;
  sold = 0;
  constructor(
    private signingService: SigningService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.list();
  }

  list() {
    this.signingService.sales({id: this.user._id})
    .subscribe(result => {
      console.log(result);
      if (result['body'] && result['body']['products'] && result['body']['products']['length'] > 0) {
        this.articles = result['body']['products'];
        this.articles.forEach(article => {
          article.approved ? this.approved ++ : null;
          article.sold ? this.sold ++ : null;
          article.sold ? this.total += article.price : null; 
          // article.image_path = environment.apiUrl + '/' + article.image_path;
        });
      }
      else {
        this.signingService.presentToast('No sales yet');
      }
      if (result['body'] && !result['body']['status']) {
        this.signingService.presentToast(result['body']['message']);
      }
    }, err => console.log(err));
  }
  removeProduct(id) {
    this.signingService.deleteProduct(id)
      .subscribe(
        result => {
          this.list();
        },
        err => console.log(err)
      );
  }
}
