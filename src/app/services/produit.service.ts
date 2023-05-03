import { Injectable } from '@angular/core';
import { Categorie } from '../models/categorie';
import { Produit } from '../models/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategorieWrapper } from '../models/CategorieWrapper';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),

  };
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  categories! : Categorie[];
  produits! : Produit[]
  produit! : Produit;
  apiUrl: string  = "http://localhost:8080/produits/api"
  apiUrlcat: string = "http://localhost:8080/produits/cat"
  apiProdCats : string = "http://localhost:8080/produits/api/prodscat"
  apiProdsNom: string = "http://localhost:8080/produits/api/prodsByName"
 
  constructor(private http: HttpClient) {

   }
   listeProduits():Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl+"/all")
   }

   ajouterProduit( prod: Produit): Observable<Produit>{
    
    return this.http.post<Produit>(this.apiUrl, prod)
   }

   supprimerProduit(id: number): Observable<Produit>{
    const apiDelete = `${this.apiUrl}/${id}`;
    
    return this.http.delete<Produit>(apiDelete)
   }

   consulterProduit(id:number): Observable<Produit>{
    const apiDelete = `${this.apiUrl}/${id}`;
    return this.http.get<Produit>(apiDelete)
    }

    updateProduit(p:Produit): Observable<Produit>{
      
        return this.http.put<Produit>(this.apiUrl, p)
    }
    trierProduits(){
      this.produits = this.produits.sort((n1,n2) => {
          if (n1.idProduit > n2.idProduit ) {
            return 1;
          }
          if (n1.idProduit < n2.idProduit) {
           return -1;
          }
           return 0;
        });
      }

    listeCategories():Observable <CategorieWrapper> {
      
        return this.http.get<CategorieWrapper>(this.apiUrlcat)
     }
      
    consulterCategorie(id:number): Categorie{
         return this.categories.find(cat => cat.idCat == id)!;
     }
     ajouterCategorie(cat : Categorie): Observable<Categorie>{
      return this.http.post<Categorie>(this.apiUrlcat, cat, httpOptions)
     }

     rechercheParcategorie(idCat: number): Observable<Produit[]>{
      const apiProdsCatId = `${this.apiProdCats}/${idCat}`
      return this.http.get<Produit[]>(apiProdsCatId)
     }

     rechercherParNom(nomProduit: String): Observable<Produit[]>{
      const url =  `${this.apiProdsNom}/${nomProduit}`
      return this.http.get<Produit[]>(url, httpOptions)
     }


}
