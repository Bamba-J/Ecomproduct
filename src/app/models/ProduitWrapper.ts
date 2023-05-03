import { Produit } from "./produit.model"

export class ProduitWrapper{
    _embedded!: {
        produits: Produit[]
    }
}