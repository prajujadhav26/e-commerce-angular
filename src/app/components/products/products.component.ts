import { ApiServiceService } from './../../services/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any = null;

  constructor(public api:ApiServiceService) { }

  ngOnInit(): void {
    this.api.post("product/list", {}).subscribe((data:any)=>{
      this.products = data.data;
    });
  }
}
