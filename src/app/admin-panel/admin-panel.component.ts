import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SigningService } from '../services/signing.service';
import { ProductService } from '../services/product.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  products;
  users;
  activeLayer;
  isUserActive;
  sortBy = 'Username';
  viewBy = 'Ascending';
  constructor(
    private title: Title,
    private signingService: SigningService,
    private productService: ProductService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.title.setTitle('Admin Panel - Fulda Buy & Sell');
    this.loadProducts();
    this.loadUsers();
  }

  sort(sortBy) {
    let swapped;
    console.log(sortBy);
    console.log(this.viewBy);
    do {
      swapped = false;
      for (let i = 0; i < this.activeLayer.length - 1; i++) {
        let current = this.activeLayer[i][sortBy];
        let next =  this.activeLayer[i + 1][sortBy];

        if (sortBy !== 'price') {
          current = current.toLowerCase();
          next = next.toLowerCase();
        }
        if (sortBy === 'created_at') {
          current = new Date(current).getTime();
          next = new Date(next).getTime();
        }
        let condition = current > next;
        if (this.viewBy === 'Descending') {
          condition = current < next;
        }

        if (condition) {
          const temp = this.activeLayer[i];
          this.activeLayer[i] = this.activeLayer[i + 1];
          this.activeLayer[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  }

  action(record) {
    console.log(record);
    this.productService.changeProductStatus(record)
      .subscribe(
        result => {
          console.log(result);
          if (result['status']) {
            this.toastService.presentToast(result['message']);
            this.isUserActive
              ? this.loadUsers()
              : this.loadProducts();
          }
        },
        err => console.log(err),
      );
  }
  delete(id) {
    console.log(id);
    this.signingService[this.isUserActive ? 'deleteUser' : 'deleteProduct'](id)
      .subscribe(
        result => {
          console.log(result);
          if (result['status']) {
            this.toastService.presentToast(result['message']);
            this.isUserActive
              ? this.loadUsers()
              : this.loadProducts();
          }
        },
        err => console.log(err),
      );
  }

  loadProducts() {
    this.productService.searchProducts({ name: null, admin: true })
      .subscribe(
        result => {
          console.log(result);
          this.products = result.body['product'];
          this.activeLayer = this.products;
          this.isUserActive = false;
        },
        err => console.log('err => ', err)
      );
  }

  loadUsers() {
    this.signingService.searchUsers({ name: null, admin: true })
      .subscribe(
        result => {
          console.log(result.body);
          this.users = result.body;
          this.activeLayer = this.users;
          this.isUserActive = true;
        },
        err => console.log('err => ', err)
      );
  }
}
