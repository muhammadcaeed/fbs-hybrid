import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {SigningService} from '../services/signing.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles = [];
  constructor(
    private title: Title,
    private signingService: SigningService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Home - Fulda Buy & Sell');
    this.latestProducts();
  }

  latestProducts() {
    this.signingService.latestProducts()
      .subscribe(result => {
        if (result && result['products']) {
          this.articles = result['products'];
          // this.articles.forEach(article => {
          //   article.image_path = environment.apiUrl + '/' + article.image_path;
          // });
        }
      });
  }
  productDetails(id) {
    this.router.navigate(['product-detail', {id: id}]);
  }
}
