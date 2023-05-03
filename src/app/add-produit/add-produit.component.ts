import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../models/categorie';
import { CategorieWrapper } from '../models/CategorieWrapper';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  categories! : Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;

  newProduit = new Produit()
  constructor(private produitService : ProduitService, private router: Router) {

   }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats =>{
        this.categories = cats._embedded.categories
    })
    
  }

  addProduit(){
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;

    this.produitService.ajouterProduit(this.newProduit).subscribe(prod =>{
      console.log(prod)
      this.router.navigate(['produits'])
    })
    
  }

}
//{}[]||@<>