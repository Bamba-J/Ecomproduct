import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Categorie } from '../models/categorie';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styles: [
  ]
})
export class UpdateCategorieComponent implements OnInit {

  //{}[]||@<>
  @Input()
  ajout!: boolean;

  @Input()
  categorie! : Categorie;

  @Output()
  categorieUpdated = new EventEmitter<Categorie>()

  constructor() { 

  }

  ngOnInit(): void {
    console.log(this.categorie)
  }

  saveCategorie(){
    this.categorieUpdated.emit(this.categorie)
  }

  updateCategorie(){
    
  }
}
