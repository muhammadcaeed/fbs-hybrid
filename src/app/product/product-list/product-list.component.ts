import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SigningService } from '../../services/signing.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  articles;
  keyword;
  filter = 'recent';
  constructor(
    private title: Title,
    private signingService: SigningService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.title.setTitle('Products List - Fulda Buy & Sell');
    this.keyword = this.route.snapshot.params.name;
    this.list();
  }

  list() {
    console.log(this.keyword);
    this.signingService.searchProducts({name: this.keyword, filter: this.filter})
    .subscribe(results => {
      if (results['status'] && results['body'] && Array.isArray(results['body']['product'])) {
        this.articles = results['body']['product'];
        // this.articles.forEach(article => {
        //   article.image_path = environment.apiUrl + '/' + article.image_path;
        // });
      }
    }, err => console.log('err => ', err));
  }

  productDetails(id) {
    this.router.navigate(['product-detail', {id: id}]);
  }
}
