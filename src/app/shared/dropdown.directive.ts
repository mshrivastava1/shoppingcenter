import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  //Binding the property of the dierective
  @HostBinding('class.open') isOpen = false;

  //Listening to the click event
  @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
