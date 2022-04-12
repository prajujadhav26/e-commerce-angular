import { CookieServiceService } from './../../services/cookie-service.service';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  baseurl = this.api.baseurl;
  products: any;
  id:string = "";
  status:string = "";
  instock:string = "";
  constructor(private api: ApiServiceService, private cookie: CookieServiceService) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.api.post("product/list", { data: {} }).subscribe((mydata: any) => {
      this.products = mydata.data;
      console.log(this.products);
    });
  }
  delete(id: string): void {
    if (confirm("Sure to Delete?")) {
      let data = { id: id };
      this.api.post("product/delete", { data: data }).subscribe((mydata: any) => {
        this.list();
      });
    }
  }

  changestatus(id:string): void{
    let data = { id: id};
    this.api.post("product/get", { data : data}).subscribe((mydata:any)=>{
      this.status = mydata.data.status;
      // alert(this.status);
      if(this.status == "Open"){
        let data = { id : id, status:"Closed"};
        this.api.post("product/changestatus", {data : data}).subscribe((mydata:any)=>{
        // console.log(mydata);
        this.list();
        });
      }
      else
      {
        let data = {id: id , status:"Open"};
        this.api.post("product/changestatus", {data : data}).subscribe((mydata:any)=>{
          // console.log();
          this.list();
        });
      }
    });

  }

  changestocks(id:string):void{
    let data = { id: id};
    this.api.post("product/get", { data : data}).subscribe((mydata:any)=>{
      this.instock = mydata.data.instock;
      // alert(this.status);
      if(this.instock == "Yes"){
        let data = { id : id, instock:"No"};
        this.api.post("product/updatestock", {data : data}).subscribe((mydata:any)=>{
        // console.log(mydata);
        this.list();
        });
      }
      else
      {
        let data = {id: id , instock:"Yes"};
        this.api.post("product/updatestock", {data : data}).subscribe((mydata:any)=>{
          // console.log();
          this.list();
        });
      }
    });
  }
}
