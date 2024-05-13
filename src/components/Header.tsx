import { useEffect, useMemo,useState,ChangeEvent,FormEvent } from "react";
import {NavLink,useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";
import Notification from "./Notification";

const Header = () => {
  
  const [searchFilter,setSearchFilter]=useState({
    ingredient:'',
    category:''
  })

  const{pathname}=useLocation();

  const isHome=useMemo(()=> pathname==='/' ,[pathname])

  const {fetchCategories,categories,searchRecipes,showNotification}=useAppStore()


  useEffect(()=>{
    fetchCategories()

  },[])

  const handleChange=(e:ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>)=>{
   setSearchFilter({
    ...searchFilter,
    [e.target.name]:e.target.value
   })

  }

  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    if(Object.values(searchFilter).includes('')){
      showNotification({
        text:'Todos los campos son obligatorios',
        error:true
    })
      return
    }
    //consultar recetas
    searchRecipes(searchFilter)

  }


  return (
    <header className={isHome ? "bg-header bg-center bg-cover":'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
          <Notification/>
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
              <form 
              className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
              onSubmit={handleSubmit}
              >
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
                        onChange={handleChange}
                        value={searchFilter.ingredient}
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
                        onChange={handleChange}
                        value={searchFilter.category}
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