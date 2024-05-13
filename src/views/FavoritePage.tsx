import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

const FavoritePage = () => {

  const {favorites}=useAppStore()
  const hasFavorites=useMemo(()=> favorites.length,[favorites])

  return (
    <>
      <h1 className="text-6xl font-extrabold"> Favoritos</h1>
      {hasFavorites ? (
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 my-10 gap-10">
        {favorites.map(drink =>(
          <DrinkCard
          key={drink.idDrink}
          drink={drink}
          />
        ))}
        </div>
      ):(
        <p className=" text-center my-10 text-2xl">Los favoritos se mostraran aqui</p>
      )}
    </>
  )
}

export default FavoritePage