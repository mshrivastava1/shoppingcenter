import { AuthService } from './../auth/auth.service';
import { Ingredient } from './ingredient.model';
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService{

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService){
  }

  storeRecipes(){
    const tk: string = this.authService.getToke();
   return this.http.put('https://ng-recipe-book-df843.firebaseio.com/recipes.json?auth='+tk, this.recipeService.getRecipes());
  }

  getRecipes(){
    const tk: string = this.authService.getToke();
    return this.http.get('https://ng-recipe-book-df843.firebaseio.com/recipes.json?auth='+tk)
    .map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for(let recipe of recipes) {
          if(!recipe['ingredients']) {
            recipe['Ingredients'] = [];
          }
        }
        return recipes;
      }
    ).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );
  }

}
