import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SigningService } from '../../services/signing.service';
import { environment } from '../../../environments/environment';
import { ActionSheetController } from '@ionic/angular';

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
    private router: Router,
    public actionSheetController: ActionSheetController
    ) { }

  ngOnInit() {
    this.title.setTitle('Products List - Fulda Buy & Sell');
    this.keyword = this.route.snapshot.params.name;
    this.list();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort',
      buttons: [{
        text: 'Most Recent',
        icon: 'arrow-up',
        handler: () => {
          console.log('Most Recent');
          this.filter="recent"
          this.list();
        }
      }, {
        text: 'Price: Lowest First',
        icon: 'logo-euro',
        handler: () => {
          console.log('Price: Lowest First');
          this.filter="price_lowest"
          this.list();
        }
      }, {
        text: 'Price: Highest First',
        icon: 'logo-euro',
        handler: () => {
          console.log('Price: Highest First');
          this.filter="price_highest"
          this.list();
        }
      }, {
        text: 'Product Name : A to Z',
        icon: 'arrow-dropdown-circle',
        handler: () => {
          console.log('Product Name : A to Z');
          this.filter="name_asc"
          this.list();
        }
      }, {
        text: 'Product Name : Z to A',
        icon: 'arrow-dropup-circle',
        handler: () => {
          console.log('Product Name : Z to A');
          this.filter="name_desc"
          this.list();
        }
      }, {
        text: 'Close',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Close');
        }
      }]
    });
    await actionSheet.present();
  }

  list() {
    console.log(this.keyword);
    this.signingService.searchProducts({name: this.keyword, filter: this.filter})
    .subscribe(results => {
      console.log('results =>', results);
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
