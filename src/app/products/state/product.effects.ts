import { Injectable } from "@angular/core";
import { Actions,Effect,ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductActions from './product.action'
import { mergeMap, map } from "rxjs/operators";
import { Product } from "../product";


@Injectable()
export class ProductEffects{

    constructor(private actions$:Actions,private productService:ProductService){

    }

    @Effect()
    loadProducts$=this.actions$.pipe(
        ofType(ProductActions.ProductActionTypes.Load),
        mergeMap((action:ProductActions.Load)=>this.productService.getProducts().pipe(
            map((products:Product[])=>(new ProductActions.LoadSuccess(products)))
        ))
    )

    @Effect() updateProduct$=this.actions$.pipe(
        ofType(ProductActions.ProductActionTypes.UpdateProduct),
        map((action:ProductActions.UpdateProduct)=>action.payload),
        mergeMap((product:Product)=>
        this.productService.updateProduct(product).pipe(
            map(updatedProduct=>(new ProductActions.UpdateProductSuccess(updatedProduct)))
        )
        )
    )
}