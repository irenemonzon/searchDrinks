import axios from "axios"
import { CategoryApiResponseSchema, DetailDrinkApiResponse, DrinksApiResponse } from "../schema/recipe-schema"
import { Drink, SearchFilter } from "../types"

export async function getCategories(){
    const url='https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data}=await axios(url)
    const result=CategoryApiResponseSchema.safeParse(data)
    if(result.success){
        return result.data
    }
}

export async function getRecipes(filters:SearchFilter){
    const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data}=await axios(url)
    const result=DrinksApiResponse.safeParse(data)
    if(result.success){
        return result.data
    }

}
export async function getDetailDrink(id:Drink['idDrink']){
    const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data}=await axios(url)
    const result=DetailDrinkApiResponse.safeParse(data.drinks[0])
    if(result.success){
        return result.data
    }
}