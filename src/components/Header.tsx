import { useEffect, useMemo } from "react";
import {NavLink,useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

const Header = () => {
  

  const{pathname}=useLocation();

  const isHome=useMemo(()=> pathname==='/' ,[pathname])

  const {fetchCategories,categories}=useAppStore()


  useEffect(()=>{
    fetchCategories()

  },[])


  return (
    <header className={isHome ? "bg-header bg-center bg-cover":'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img className="w-32" src="/logo.svg" alt="logo" />
                </div>
                <nav className="flex gap-4">
                  <NavLink 
                    to="/"
                    className={({isActive})=> isActive ? "text-orange-500 uppercase font-bold":'text-white uppercase font-bold'}
                  >Inicio
                  </NavLink>
                  <NavLink 
                    to="/favoritos"
                    className={({isActive})=> isActive ? "text-orange-500 uppercase font-bold":'text-white uppercase font-bold'}
                  >
                      Favoritos
                  </NavLink>

                </nav>

            </div>
            {isHome &&(
              <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6">
                <div className="space-y-4">
                  <label
                     htmlFor="ingredient"
                     className="block text-white font-extrabold text-lg "
                     > Nombre o Ingredientes</label>
                     <input
                        id="ingredient"
                        name='ingredient'
                        type='text'
                        className="p-3 w-full rounded-lg focus:outline-nome"
                        placeholder="Nombre o Ingrediente. Ej Vodka,Tequila..."
                     />
                </div>
                <div className="space-y-4">
                  <label
                     htmlFor="category"
                     className="block text-white font-extrabold text-lg "
                     > Categoria</label>
                     <select
                        id="category"
                        name='category'
                        className="p-3 w-full rounded-lg focus:outline-none"
                     >
                      <option value="">--Seleccione--</option>
                      {categories.drinks.map(drink=>(
                        <option
                        key={drink.strCategory}
                        value={drink.strCategory}
                        >
                          {drink.strCategory}
                        </option>

                      ))}
                     </select>
                </div>
                <input
                  type="submit"
                  value='Buscar recetas'
                  className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg"
                />
              </form>
            )}
        </div>
    </header>
  )
}

export default Header