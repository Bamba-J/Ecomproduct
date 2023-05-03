import { Categorie } from "./categorie";

//cette classe permet de consommer les api Spring Data rest
export class CategorieWrapper{
    _embedded! : {
        categories : Categorie[]
    }
}