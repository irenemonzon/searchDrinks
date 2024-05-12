import { StateCreator } from "zustand"
import { getCategories, getDetailDrink, getRecipes } from "../services/RecipeService"
import type { Categories, Drinks,Drink, SearchFilter, DetailDrink } from "../types"


export type RecipeSliceType={
    categories:Categories
    drinks:Drinks
    detailDrink:DetailDrink
    modal:boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (SearchFilters:SearchFilter) => Promise<void>
    selectRecipe:(id:Drink['idDrink']) => Promise<void>
    closeModal:()=>void
    
}


export const createRecipesSlice:StateCreator <RecipeSliceType> =(set)=>({
    categories:{
        drinks:[]
    },
    drinks: {
        drinks:[]
    },
    detailDrink:{} as DetailDrink,
    modal:false,
    fetchCategories:async()=>{
        const categories=await getCategories()
        set({
            categories
        })
    },
    searchRecipes:async(filters)=>{
      const drinks=await getRecipes(filters)
      set({
        drinks
      })
    },
    selectRecipe:async(id)=>{
        const detailDrink=await getDetailDrink(id)
        set({
            detailDrink,
            modal:true
          })
    },
    closeModal:()=>{
        set({
            modal:false,
            detailDrink:{} as DetailDrink
        })
    }
})