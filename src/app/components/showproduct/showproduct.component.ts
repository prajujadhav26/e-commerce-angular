import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';

declare var Razorpay: any;

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.css']
})
export class ShowproductComponent implements OnInit {
  form: any = {};
  paymentId: string = "";
  error: any = "";
  message: string = "Waiting";


  showform: boolean = false;
  order: any;
  data: any;
  id: string | null = "0";
  baseurl = this.api.baseurl;
  date: Date = new Date();
  orderid:string ="";

  constructor(private api: ApiServiceService, private route: ActivatedRoute) { }

  options = {
    "key": "rzp_live_swPK7rd1Iy42Cf",
    "amount": "1",
    "name": "Abhijit Gatade",
    "description": "Web Development",
    "image": "https://www.javachinna.com/wp-content/uploads/2020/02/android-chrome-512x512-1.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  ngOnInit(): void {
    window.scroll(0, 0);

    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id == null)
      this.id = "0";
    if (this.id != "0") {
      this.api.post("product/get", { data: { id: this.id } }).subscribe((data: any) => {
        console.log(data.data);
        this.data = data.data;
        this.data["shipping"] = 20;
        this.data["quantity"] = 1;
        this.initialize();
      });
    }
  }
  initialize() {
    this.data.total = this.data.quantity * this.data.price + this.data.shipping;
    this.order = new FormGroup({
      id: new FormControl(""),
      productid: new FormControl(this.id),
      productname: new FormControl(this.data.name),
      imagepath: new FormControl(this.data.imagepath),
      name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      mobileno: new FormControl("", Validators.compose([Validators.required])),
      pincode: new FormControl("", Validators.compose([Validators.required])),
      size: new FormControl("", Validators.compose([Validators.required])),
      color: new FormControl("", Validators.compose([Validators.required])),
      quantity: new FormControl(this.data.quantity, Validators.compose([Validators.required])),
      price: new FormControl(this.data.price, Validators.compose([Validators.required])),
      shipping: new FormControl(this.data.shipping, Validators.compose([Validators.required])),
      total: new FormControl(this.data.total, Validators.compose([Validators.required])),
    })
  }
  show() {
    this.showform = true;
    window.scroll(0, 1000);
  }

  submit(order: any): void {
    console.log(order);
    let data = { data: order };
    this.api.post("order/place", data).subscribe((data: any) => {
      this.orderid = data._id;
      // alert("Order Placed....");
      window.location.href = "products";
      // console.log(data);

      this.paymentId = '';
      this.error = '';
      // this.orderService.createOrder(this.form).subscribe(
      // data => {
      this.options.key = "rzp_live_swPK7rd1Iy42Cf";
      //this.options.order_id = "1234";
      this.options.amount = "100"; //paise
      this.options.prefill.name = "Abhijit Gatade";
      this.options.prefill.email = "gatadeabhijit@gmail.com";
      this.options.prefill.contact = "9561320192";
      var rzp1 = new Razorpay(this.options);
      rzp1.open();

      rzp1.on('payment.failed', function (response: any) {
        // Todo - store this information in the server
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        //this.error = response.error.reason;
      }
      );
      // }
      // ,
      // err => {
      //     this.error = err.error.message;
      // }
      // );

    })
  }

  quantitychanged(event: Event) {
    let ctrl = <HTMLSelectElement>event.target;
    this.data.quantity = Number("0" + ctrl.value);
    this.initialize();
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    let data = { id: this.orderid}
    this.api.post("order/paymentsuccess", { data: data}).subscribe((data: any) =>{
      this.data = data.data;
    })
    // this.orderService.updateOrder(event.detail).subscribe(
    // data => {
    //     this.paymentId = data.message;
    // }
    // ,
    // err => {
    //     this.error = err.error.message;
    // }
    //);
    this.message = "Success";
  }
}
