import { Subscription } from 'rxjs/Subscription';

import { Component, OnInit, Input, Output, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @Input() ingredientList: Ingredient[];

  // in this case using service doesnot need to bind property with input, so commenting the upper part
  // ingredientList: Ingredient[];
  // event listner is not needed as we are using the service
  // @Output() onAddItemEvent = new EventEmitter<Ingredient>();


/*  @ViewChild('ingredientNameInput') ingredientNameInput: ElementRef;
 @ViewChild('ingredientAmoutIntput') ingredientAmoutIntput: ElementRef; */
 // ingredient = new Ingredient(this.ingredientNameInput.nativeElement.value, this.ingredientAmoutIntput.nativeElement.value);
  ingredient: Ingredient;
  editedIndex: number;
  editedIngredient: Ingredient;
  subscription: Subscription;
  editMode = false;
  @ViewChild('f') shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {

  }
  ngOnInit() {
    // this.ingredientList = this.shoppingListService.getShoppingList();
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });

      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    this.ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateShoppingList(this.editedIndex, this.ingredient);
    } else {
      this.shoppingListService.onAddShoppingItem(this.ingredient);
    }
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDeleteItem() {
  /*  const index = this.ingredientList.indexOf(this.ingredientNameInput.nativeElement.value);
   this.ingredientList.splice(index); */
   this.shoppingListService.deleteItem(this.editedIndex);
   this.onClear();

  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

}
