import { z } from "zod"
import { CategoryApiResponseSchema } from "../schema/recipe-schema"


export type Categories=z.infer<typeof CategoryApiResponseSchema>