import { useState, useEffect } from 'react';

//Aramis:Esto si es necesario que sea any porque pretendo reutilizarlo en muchos componentes.
export const useLocalStorage = (key:string,initialValue:any,asynchronousFunction:any,paramsFrunction:any,numberPage:number = 1) => {
  const [valueStorage, setValueStorage] = useState<any>(() => {
   try {
    const saveValue = window.localStorage.getItem(key)
    return saveValue ? JSON.parse(saveValue): initialValue

   } catch (error) {
     console.error(error)
   }
  })
  useEffect(()=>{
    try {
      if(asynchronousFunction && !valueStorage.length) {
        asynchronousFunction(paramsFrunction).then((response:any) => {
          window.localStorage.setItem(key,JSON.stringify(response))
          setValueStorage(response)})
      }
    } catch (error) {
      console.error(error)
    }
  },[])
  const setSaveValue = (value:any) => {
    try {
      setSaveValue(value)
      window.localStorage.setItem(key,JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  }
  //Aramis:Esto solo sirve para cambiar la pagina, nada mas
  //Esta funcion espera que la primera pagina siempre este cargada
  const nextPaginate = async (conditions:number) => {
    asynchronousFunction(conditions).then((response:any) => {
      window.localStorage.setItem(key,JSON.stringify(response))
      setValueStorage(response)
      console.log(response);
      
    })
  };
  return [valueStorage,setSaveValue,nextPaginate]
}