import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({  providedIn: 'root' })
export class SigningService {

  constructor( private http: HttpClient ) {}

  searchUsers(params) {
    const url = environment.apiUrl + '/api/users';
    if (!params.name) {
      delete params['name'];
    }
    return this.http.get(url, { params, observe: 'response' });
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
}
