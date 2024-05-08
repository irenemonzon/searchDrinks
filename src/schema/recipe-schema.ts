import {z} from 'zod'

export const CategoryApiResponseSchema=z.object({
    drinks:z.array(
        z.object({
            strCategory:z.string()
        })
    )
})