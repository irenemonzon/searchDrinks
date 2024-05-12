import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { DetailDrink } from '../types';


export default function Modal() {

    const {modal,closeModal, detailDrink}=useAppStore()

    const renderIngredients=()=>{

        const ingredients:JSX.Element[]=[]
        for(let i=1 ; i<=6;i++){
            const ingredient=detailDrink[`strIngredient${i}` as keyof DetailDrink]
            const measure=detailDrink[`strMeasure${i}` as keyof DetailDrink]
            if(ingredient && measure){
                ingredients.push(
                    <li key={i} className='text-lg font-normal'>
                        {ingredient}-{measure}
                    </li>

                )
            }
        }
       return ingredients
    }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {detailDrink.strDrink}
                  </DialogTitle>
                  <img 
                    className='mx-auto w-96'
                    src={detailDrink.strDrinkThumb} alt={`imagen de ${detailDrink.strDrink}`} />
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredientes y Cantidades
                  </DialogTitle>
                  {renderIngredients()}
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instrucciones
                  </DialogTitle>
                  <p className='text-lg'>           {detailDrink.strInstructions}
                  </p>
                  <div className='mt-5 flex justify-between gap-4'>
                    <button 
                        type='button'
                        className='w-full rounded bg-gray-600 p-3 font-bold text-white shadow hover:bg-gray-500'
                        onClick={closeModal}
                        >
                        Cerrar
                    </button>
                    <button 
                        type='button'
                        className='w-full rounded bg-orange-600 p-3 font-bold text-white shadow hover:bg-orange-500'
                        >
                        Agregar a favoritos
                    </button>
                </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}