import { RecipeService } from './../recipe.service';
/* import { Component, OnInit, Input } from '@angular/core'; *///commenting because we are using routing rahter than binding the input

import { Component, OnInit } from '@angular/core';
import { Recipe } from './../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 /*  @Input() recipeDetail: Recipe; */

 recipeDetail: Recipe;
 id : number;

  constructor(private recipeService: RecipeService,
  private activeRoute: ActivatedRoute, private rounte: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.recipeDetail = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddIngredientToShoppingList(){
    this.recipeService.onAddIngredientsToShoppingList(this.recipeDetail.ingredients);
  }
  onEdit(){
    //this.rounte.navigate(['edit'],{relativeTo: this.activeRoute});
    this.rounte.navigate(['../',this.id,'edit'], {relativeTo: this.activeRoute});
  }

  onDelete(){
    this.recipeService.onDeleteRecipe(this.id);
    this.rounte.navigate(['../', {relativeTo: this.rounte}]);
  }
}
