import { DataStorageService } from './../../shared/data-storage.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipeService } from './../recipe.service';
import {Recipe} from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelect = new EventEmitter<Recipe>();
 /*  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('A Second Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ]; */

  recipes: Recipe[];

  //To use service in component you needs to initiate in the constructor.
  constructor(private recipeService: RecipeService,
  private rounter: Router,
  private activeRounte: ActivatedRoute,
private dataStorageService: DataStorageService) { }

  onNewRecipe(){
    console.log("inside the method");
    this.rounter.navigate(['new'],{relativeTo: this.activeRounte});
  }

  ngOnInit() {
    this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
   this.dataStorageService.getRecipes();
    //this.headerComponet.fetchData();
  }

  /* onRecipeSelected(recipe: Recipe){
    this.recipeWasSelect.emit(recipe);
  } */
}
