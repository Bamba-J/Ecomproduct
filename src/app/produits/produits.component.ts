import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
//{}[]||@<>
  produits?: Produit[];

  constructor(private produitService: ProduitService, public authService: AuthService) { 

   }

  ngOnInit(): void {
    this.produitService.listeProduits().subscribe(prods=>{
      console.log(prods)
      this.produits = prods
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


