import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  constructor(private http: HttpClient) {}
  searchProducts(params) {
    const url = environment.apiUrl + '/api/products';
    if (!params.name) {
      delete params['name'];
    }
    return this.http.get(url, { params, observe: 'response' });
  }
  searchUsers(params) {
    const url = environment.apiUrl + '/api/users';
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
  registerUser(user) {
    const url = environment.apiUrl + '/api/users';
    return this.http.post(url, user);
  }
  loginUser(user) {
    const url = environment.apiUrl + '/api/users/login';
    return this.http.post(url, user);
  }
  changePassword(user) {
    const url = environment.apiUrl + '/api/users/change-password';
    return this.http.post(url, user);
  }
  changeProductStatus(product) {
    const url = environment.apiUrl + '/api/products/product-status';
    return this.http.post(url, product);
  }
  changeUserStatus(user) {
    const url = environment.apiUrl + '/api/users/user-status';
    return this.http.post(url, user);
  }
  getUser(id) {
    const url = environment.apiUrl + '/api/users/' + id;
    return this.http.get(url);
  }
  updateUser(user) {
    const url = environment.apiUrl + '/api/users/' + user._id;
    return this.http.put(url, user);
  }
  deleteProduct(id) {
    const url = environment.apiUrl + '/api/products/' + id;
    return this.http.delete(url);
  }
  deleteUser(id) {
    const url = environment.apiUrl + '/api/users/' + id;
    return this.http.delete(url);
  }
  checkout(order) {
    const url = environment.apiUrl + '/api/wishlist/checkout';
    return this.http.post(url, order);
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
