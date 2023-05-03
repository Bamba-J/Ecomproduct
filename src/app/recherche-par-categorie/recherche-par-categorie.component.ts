import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie';
import { Produit } from '../models/produit.model';
import { AuthService } from '../services/auth.service';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html',
  styles: [
  ]
})
export class RechercheParCategorieComponent implements OnInit {

  produits!: Produit[];
  categories!: Categorie[];
  IdCategorie!: number;
  constructor(private produitService: ProduitService, public authService: AuthService) { }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(cats =>{
      this.categories = cats._embedded.categories
    })

    
  }

  onChange(){
      this.produitService.rechercheParcategorie(this.IdCategorie).subscribe(prods => {
        this.produits = prods
        console.log(prods)
      })
  }

  supprimerProduit(produit: Produit){
    let conf = confirm("etes vous sur de supprimer")
    if (conf)
      this.produitService.supprimerProduit(produit.idProduit).subscribe(prod =>{
        console.log("Produit supprimé")
        this.ngOnInit()
      }) 
  }
}
