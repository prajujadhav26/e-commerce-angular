import { CookieServiceService } from './services/cookie-service.service';
import { ApiServiceService } from './services/api-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './admin/login/login.component';
import { fromEventPattern } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent as AdminProductsComponent } from './admin/products/products.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './admin/product/product.component';
import { ShowproductComponent } from './components/showproduct/showproduct.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { SubscriptionComponent } from './admin/subscription/subscription.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    ProductsComponent,
    AdminProductsComponent,
    ProductComponent,
    ShowproductComponent,
    OrdersComponent,
    SubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiServiceService,
    CookieServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
