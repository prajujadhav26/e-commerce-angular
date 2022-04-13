import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  subscription:any;

  constructor(private api:ApiServiceService) { }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.api.post("subscription/list", { data: {} }).subscribe((mydata: any) => {
      this.subscription = mydata.data;

    });
  }
}
