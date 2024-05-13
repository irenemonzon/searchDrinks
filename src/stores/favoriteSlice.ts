import { StateCreator } from "zustand";
import { DetailDrink } from "../types";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";
import { RecipeSliceType,createRecipesSlice } from "./recipeSlice";

export type favoriteSliceType={
    favorites: DetailDrink[]
    handleClickFavorite:(recipe:DetailDrink)=> void
    favoriteExists:(id:DetailDrink['idDrink'])=>boolean
    loadFromStorage:()=>void
}


export const createFavoriteSlice:StateCreator<favoriteSliceType & RecipeSliceType& NotificationSliceType,[],[],favoriteSliceType>=(set,get,api)=>({
    favorites:[],
    handleClickFavorite:(recipe) => {
        if(get().favorites.some(favorite=>favorite.idDrink === recipe.idDrink )){
            set((state)=>({
                favorites:state.favorites.filter(favorite=>favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set,get,api).showNotification({
                text:'Se elimino de favoritos',
                error:false
            })
        }else{
            set((state)=> ({
                favorites:[...state.favorites, recipe]
            }))
            createNotificationSlice(set,get,api).showNotification({
                text:'Se agrego a favoritos',
                 error:false
            })
        } 
        createRecipesSlice(set,get,api).closeModal()
        localStorage.setItem('favorites',JSON.stringify(get().favorites))

    },
    favoriteExists:(id)=>{
       return get().favorites.some(favorite=>favorite.idDrink === id )
    },
    loadFromStorage:()=>{
        const storedFavorites=localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites:JSON.parse(storedFavorites)
            })
        }

    }
})