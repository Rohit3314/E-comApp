import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './_authgaurd/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductResolveService } from './_services/product-resolve.service';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ShowProductImgaesDailogComponentComponent } from './show-product-imgaes-dailog-component/show-product-imgaes-dailog-component.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './_services/buy-product-resolver.service';
import { OrderConformationComponent } from './order-conformation/order-conformation.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { UserOrderDetailsComponent } from './user-order-details/user-order-details.component';
import { AllOrderDetailsComponent } from './all-order-details/all-order-details.component';

const routes: Routes = [
  {path:'',component:IndexPageComponent},
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'user',component:UserComponent,canActivate:[AuthGuard],data:{roles:['User']}},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'addNewProduct',component:AddNewProductComponent,canActivate:[AuthGuard],data:{roles:['Admin']}, resolve:{
    product:ProductResolveService
  } },
  {path:'showProductImagesDailog',component:ShowProductImgaesDailogComponentComponent,resolve:{product:ProductResolveService}},
  {path:'showProductDetails',component:ShowProductDetailsComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'orderInfo',component:AllOrderDetailsComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'productViewDetails',component:ProductViewDetailsComponent, resolve:{ product: ProductResolveService}},
  {path:'buyProduct',component:BuyProductComponent,canActivate:[AuthGuard],data:{roles:["User"]},
    resolve:{
      productDetails:BuyProductResolverService
    }
  },
  {path:"userOrders",component:UserOrderDetailsComponent,canActivate:[AuthGuard],data:{roles:["User"]}},
  {path:"orderConfirmation",component:OrderConformationComponent,canActivate:[AuthGuard],data:{roles:["User"]}},
  {path:"cart",component:CartComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
