import {z} from 'zod'

export const CategoryApiResponseSchema=z.object({
    drinks:z.array(
        z.object({
            strCategory:z.string()
        })
    )
})

export const SearchFilterSchema=z.object({
    ingredient:z.string(),
    category:z.string()
})
export const DrinkApiResponse=z.object({
    idDrink:z.string(),
    strDrink:z.string(),
    strDrinkThumb:z.string(),
})

export const DrinksApiResponse=z.object({
    drinks:z.array(DrinkApiResponse)
})