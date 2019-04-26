import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service'
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  //providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
/*
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]; */

  private ingredients: Ingredient[];
  private subscription: Subscription;

 /*  onAddShoppingItem(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
  } */

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredientList: Ingredient[]) => {
        this.ingredients = ingredientList;
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEditedItem(index: number){
    this.shoppingListService.startEditing.next(index);
  }


}
