/* import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; */
import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;
 // @Output() recipeSelected = new EventEmitter<void>();

 //commenting select function as we are going to use routes
  /* onSelected(){
    //this.recipeSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  } */
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {


  }

}
