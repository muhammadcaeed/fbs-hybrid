import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor( private http: HttpClient ) {}

  searchProducts(params) {
    const url = environment.apiUrl + '/api/products';
    if (!params.name) {
      delete params['name'];
    }
    return this.http.get(url, { params, observe: 'response' });
  }
  getProduct(id) {
    const url = environment.apiUrl + '/api/products/' + id;
    return this.http.get(url);
  }
  getCategories() {
    const url = environment.apiUrl + '/api/products/get-categories';
    return this.http.get(url);
  }
  postProduct(product) {
    const url = environment.apiUrl + '/api/products/add-product';
    return this.http.post(url, product);
  }
  changeProductStatus(product) {
    const url = environment.apiUrl + '/api/products/product-status';
    return this.http.post(url, product);
  }
  deleteProduct(id) {
    const url = environment.apiUrl + '/api/products/' + id;
    return this.http.delete(url);
  }
  sales(params) {
    const url = environment.apiUrl + '/api/products/sales';
    return this.http.get(url, { params, observe: 'response' });
  }
  latestProducts() {
    const url = environment.apiUrl + '/api/products/latest';
    return this.http.get(url);
  }
}
