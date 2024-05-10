import { z } from "zod"
import { CategoryApiResponseSchema, DrinkApiResponse, DrinksApiResponse, SearchFilterSchema } from "../schema/recipe-schema"


export type Categories=z.infer<typeof CategoryApiResponseSchema>
export type SearchFilter=z.infer<typeof SearchFilterSchema>
export type Drinks=z.infer<typeof DrinksApiResponse>
export type Drink=z.infer<typeof DrinkApiResponse >