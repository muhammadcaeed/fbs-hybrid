import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class WishlistService {

  constructor(private http: HttpClient) {}
  addToWishlist(product) {
    const url = environment.apiUrl + '/api/wishlist';
    return this.http.post(url, product);
  }
  exist(product) {
    const url = environment.apiUrl + '/api/wishlist/exist';
    return this.http.post(url, product);
  }
  getWishlist(buyer_id) {
    const url = environment.apiUrl + '/api/wishlist/' + buyer_id;
    return this.http.get(url);
  }
  removeProductFromWishlist(product) {
    const url = environment.apiUrl + '/api/wishlist/remove-product';
    return this.http.post(url, product);
  }
  checkout(order) {
    const url = environment.apiUrl + '/api/wishlist/checkout';
    return this.http.post(url, order);
  }
}
