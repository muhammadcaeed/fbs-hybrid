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
  filter;
  constructor(
    private title: Title,
    private signingService: SigningService,
    private route: ActivatedRoute,
    private router: Router,
    public actionSheetController: ActionSheetController
    ) { }

  ngOnInit() {
    this.title.setTitle('Products List - Fulda Buy & Sell');
    this.showProducts();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Sort',
      buttons: [{
        text: 'Most Recent',
        icon: 'arrow-up',
        handler: () => {
          console.log('Most Recent');
          this.filter="created_at"
          this.showProducts();
          this.bubbleSort(this.articles, this.filter);
        }
      }, {
        text: 'Price: Lowest First',
        icon: 'logo-euro',
        handler: () => {
          console.log('Price: Lowest First');
          this.filter="price"
          this.showProducts();
          this.bubbleSort(this.articles, this.filter);
        }
      },  {
        text: 'Product Name : A to Z',
        icon: 'arrow-dropdown-circle',
        handler: () => {
          console.log('Product Name : A to Z');
          this.filter="name"
          this.showProducts();
          this.bubbleSort(this.articles, this.filter);
        }
      },  {
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

  bubbleSort(products, sortBy)
  {
      var swapped;

      console.log(products);
      console.log(sortBy);
      do {
          swapped = false;
          for (var i = 0; i < products.length - 1; i++) {
              if (products[i][sortBy] > products[i + 1][sortBy]) {
                  var temp = products[i];
                  products[i] = products[i + 1];
                  products[i + 1] = temp;
                  swapped = true;
              }
          }
      } while (swapped);

      console.log('results after sort =>',products);
  }

  showProducts() {
    this.signingService.searchProducts({})
    .subscribe(results => {
      if (results['status'] && results['body'] && Array.isArray(results['body']['product'])) {
        this.articles = results.body['product'];
      }
    }, err => console.log('err => ', err));
  }

  productDetails(id) {
    this.router.navigate(['product-detail', {id: id}]);
  }

}
