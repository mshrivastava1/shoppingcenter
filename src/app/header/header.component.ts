import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
/* import { Component, OnInit, EventEmitter, Output } from '@angular/core'; */
import { Component, OnInit} from '@angular/core';
import { Response } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 /*  @Output() featureSelected = new EventEmitter<string>(); */

  constructor(private storageService: DataStorageService, private authService: AuthService) { }

  ngOnInit() {
   // this.fetchData();
  }

 /*  onSelect(feature: string){
    this.featureSelected.emit(feature);
  } */


  saveData(){

    this.storageService.storeRecipes().
    subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  fetchData(){
    this.storageService.getRecipes();
  }

  logOut () {
    this.authService.logOut();
  }
}
