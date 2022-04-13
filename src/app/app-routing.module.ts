import { SubscriptionComponent } from './admin/subscription/subscription.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ShowproductComponent } from './components/showproduct/showproduct.component';
import { LoginComponent } from './admin/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './admin/product/product.component';
import { ProductsComponent as AdminProductsComponent } from './admin/products/products.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "admin/login", component: LoginComponent },
  { path: "admin/products", component: AdminProductsComponent },
  { path: "admin/products/:id", component: AdminProductsComponent },
  { path: "admin/product", component: ProductComponent },
  { path: "admin/product/:id", component: ProductComponent },
  { path: "products", component: ProductsComponent },
  { path: "products/showproduct", component:ShowproductComponent},
  { path: "products/:id" , component:ShowproductComponent},
  { path: "admin/orders", component:OrdersComponent},
  { path: "admin/subscription", component:SubscriptionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
