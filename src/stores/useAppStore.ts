import { create, } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipeSliceType, createRecipesSlice } from "./recipeSlice";


export const useAppStore=create<RecipeSliceType>()(devtools((...a)=>({
    ...createRecipesSlice(...a)
})))