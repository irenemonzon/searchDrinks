import { create, } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipeSliceType, createRecipesSlice } from "./recipeSlice";
import { favoriteSliceType,createFavoriteSlice } from "./favoriteSlice";
import { NotificationSliceType,createNotificationSlice } from "./notificationSlice";


export const useAppStore=create<RecipeSliceType & favoriteSliceType & NotificationSliceType >()(devtools((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})))