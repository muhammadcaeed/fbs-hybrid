import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})

export class ProductCreateComponent implements OnInit {
  user;
  form;
  categories;
  count = 0;
  uploader: FileUploader;
  product_id;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService
  ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    });
  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get condition() { return this.form.get('condition'); }
  get price() { return this.form.get('price'); }
  get category_id() { return this.form.get('category_id'); }

  post() {
    const params = this.form.value;
    params.seller_id = this.user._id;
    this.signingService.postProduct(this.form.value)
      .subscribe(result => {
        if (result['status']) {
          this.product_id = result['product_id'];
          this.uploader.queue[0].upload();
        }
      }, err => console.log('errrr :', err));
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.uploader = new FileUploader({ url: `${environment.apiUrl}/api/products/add-image` });

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('product_id', this.product_id);
    };

    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);

    this.signingService.getCategories()
      .subscribe(result => this.categories = result['categories']);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const result = JSON.parse(response); // success server response
    if (result['status']) {
      this.form.reset();
      this.uploader.clearQueue();
      this.signingService.presentToast(result['message']);
    }
}

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const error = JSON.parse(response);
    console.log('error =>', error);
    this.signingService.presentToast(error.err.message);
    this.uploader.clearQueue();
  }
}
