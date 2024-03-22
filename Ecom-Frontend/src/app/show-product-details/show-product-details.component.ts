import { Component } from '@angular/core';
import { Product } from '../_model/poduct.model';
import { ProductService } from '../_services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ShowProductImgaesDailogComponentComponent } from '../show-product-imgaes-dailog-component/show-product-imgaes-dailog-component.component';
import { Router } from '@angular/router';
import { flatMap, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent {
  productDetails:Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'Description', 'Discounted Price','Actual Price','Images','Edit','Delete'];

  constructor(private productService:ProductService,
    public imagesDialog:MatDialog,
    private imageProcessingService:ImageProcessingService,
    private router:Router
    ){}

  ngOnInit():void{
    this.getAllProducts();
  }

  showTable = false;
  pageNumber:number = 0;

  showLoadMoreButton = false;

  
  public getAllProducts(){
    this.showTable = false;
     this.productService.getAllProducts(this.pageNumber)
    .pipe(
      map((x:Product[], i) => x.map((product:Product) => this.imageProcessingService.createImages(product)))
    )
     .subscribe(
      (resp:Product[])=>{
        // console.log(resp);
        resp.forEach(
          product=> this.productDetails.push(product)
        );
        // this.productDetails = resp;
        this.showTable = true;
        if(resp.length == 8){
          this.showLoadMoreButton = true;
        }else{
          this.showLoadMoreButton = false;
        }
        
      }, (error:HttpErrorResponse)=>{
        console.log(error);
        
      }
     );
  }

  loadMoreProduct(){
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }

  deleteProduct(productId:number){
    this.productService.deleteProduct(productId).subscribe(
      (resp)=>{
        // console.log(resp);
        this.getAllProducts();
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
    
  }

  showImages(product:Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImgaesDailogComponentComponent,{
      data: {
        images:product.productImages
      },
      height: '400px',
      width: '600px',
    });
    
  }

  editProductDetails(productId:any){
      // console.log(productId);
      this.router.navigate(['/addNewProduct',{productId:productId}]);
      
  }

  
}
