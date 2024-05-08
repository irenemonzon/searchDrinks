import axios from "axios"
import { CategoryApiResponseSchema } from "../schema/recipe-schema"

export async function getCategories(){
    const url='https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data}=await axios(url)
    const result=CategoryApiResponseSchema.safeParse(data)
    if(result.success){
        return result.data
    }

}