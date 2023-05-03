import { Categorie } from "./categorie";

export class Produit{

    idProduit!: number;
    nomProduit! : string;
    prixProduit! : number;
    dateCreation! : Date ;
    categorie!: Categorie

}