import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../models/categorie';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-update-produit',
  templateUrl: './update-produit.component.html',
  styleUrls: ['./update-produit.component.css']
})
export class UpdateProduitComponent implements OnInit {

  categories! : Categorie[];
  updatedCatId! : number;
  currentProduit = new Produit;
  constructor(private produitService: ProduitService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).subscribe(prod=>{
      this.currentProduit = prod
      this.updatedCatId = this.currentProduit.categorie.idCat;
    });

    this.produitService.listeCategories().subscribe(cats=>{
      this.categories = cats._embedded.categories
    });

    
  }

  updateProduit(){

      this.currentProduit.categorie= this.categories.find(cat => cat.idCat == this.updatedCatId)!
      this.produitService.updateProduit(this.currentProduit).subscribe(prod =>{
      console.log(prod.nomProduit+"changé")
      this.router.navigate(['produits'])
    })
    

  }




}
