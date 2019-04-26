import { DataStorageService } from './../shared/data-storage.service';
import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService{
  recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[];
  /*  = [
    new Recipe('Kadhai Chicken',
    'This is simply a test',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [new Ingredient("chicken",1),
    new Ingredient("Roti",2)
  ]
  ),
    new Recipe('A Second Test Recipe',
    'Chilli Chicken',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [new Ingredient("chicken",1),
  new Ingredient("Noodle",1)]
  )
  ]; */

  getRecipes(){
  return this.recipes;
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.onAddIngredients(ingredients);

  }

  getRecipe(id: number){
   return this.recipes[id];
  }


  constructor(private slService: ShoppingListService){
  }

  onAddRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  onUpdateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  onDeleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
