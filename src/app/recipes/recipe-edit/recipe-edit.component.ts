import { Ingredient } from './../../shared/ingredient.model';
import {Recipe} from '../recipe.model';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private rService: RecipeService,
  private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
      }
    );
  }

  addIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  private initForm() {
  let recipeName = '';
  let recipeImagePath = '';
  let recipeDescription = '';
  let recipeIngredients = new FormArray([]);

  if (this.editMode) {
    const recipe = this.rService.getRecipe(this.id);
    recipeName = recipe.name;
    recipeImagePath = recipe.imagePath;
    recipeDescription = recipe.description;
    if (recipe['ingredients']) {
      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          })
        );
      }
    }
  }
  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName, Validators.required),
    'imagePath': new FormControl(recipeImagePath, Validators.required),
    'description': new FormControl(recipeDescription, Validators.required),
    'ingredients': recipeIngredients
  });
}

onSubmit() {
/* const newRecipe = new Recipe(this.recipeForm.value('name'),
this.recipeForm.value('description'),
this.recipeForm.value('imagePath'),
this.recipeForm.value('ingredients')); */

if (this.editMode) {

  this.rService.onUpdateRecipe(this.id, this.recipeForm.value);
} else {
    this.rService.onAddRecipe(this.recipeForm.value);
}
}



onCancel() {
  this.router.navigate([ '../'], {relativeTo: this.route});
}

onDeleteIngredient(index: number) {
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
}
}

