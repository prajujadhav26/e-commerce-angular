import { CookieServiceService } from './../../services/cookie-service.service';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    data:any;

  constructor(private api:ApiServiceService, private cookie:CookieServiceService, private router: Router) { }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.data = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    })
  }
  submit(data: any){
    let mydata = {data : data};
    this.api.post("admin/login", mydata).subscribe((result: any)=>{
      if(result.data.status == "success")
      {
        this.cookie.set("usertype", "admin");
        this.cookie.set("name", "Administrator");
        this.cookie.set("userid", "0");
        this.router.navigate(["./admin/products"]);
      }
      else{
        alert("Invalid Credentials");
      }
    });
  }
}
