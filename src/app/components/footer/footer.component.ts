import { Router } from '@angular/router';
import { CookieServiceService } from './../../services/cookie-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  subscribe: any;
  email: string = "";

  constructor(private api: ApiServiceService, private cookie: CookieServiceService, private router: Router) { }

  ngOnInit(): void {
    this.subscribe = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required]))
    });
  }
  subscription(subscribe: any) {
    let data = { data: subscribe }
    this.api.post("subscription/save", data).subscribe((data: any) => {
      this.email = data.email;
      alert("Subscribed");
      window.location.href = "/";
    })
  }
}

