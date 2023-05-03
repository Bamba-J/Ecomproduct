import { Component, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie';
import { AuthService } from '../services/auth.service';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-liste-categories',
  templateUrl: './liste-categories.component.html',
  styles: [
  ]
})
export class ListeCategoriesComponent implements OnInit {

  //{}[]||@<>
  ajout: boolean =true
  categories! : Categorie[]
  updatedCat: Categorie = {"idCat" : 0, "nomCat": ""}
  constructor(private produiService : ProduitService, public authService: AuthService) { }

  ngOnInit(): void {
    this.produiService.listeCategories().subscribe(cats =>{
      this.categories = cats._embedded.categories
    })
  }

  categorieUpdated(cat : Categorie){
    this.produiService.ajouterCategorie(cat).subscribe(() => {
      console.log("ajouté avec succes")
      this.ngOnInit()
    })
  }
  updateCat(cat: Categorie){
      this.updatedCat = cat
      this.ajout = false
  }
}
