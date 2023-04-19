import { useState, useEffect } from 'react';
interface customHookPaginate {
  key:string
  asynchronousFunction:any
  paramsFunction:any

}
//Aramis:Esto si es necesario que sea any porque pretendo reutilizarlo en muchos componentes.

function verifyPageInLocalStorage(key:string,pageNumber:number) {
  const savedPagesJson = window.localStorage.getItem(key)
  const savedPages = savedPagesJson &&  JSON.parse(savedPagesJson)
  return savedPages[pageNumber] 
} 

export const useNavigatePaginate = ({key,asynchronousFunction,paramsFunction}:customHookPaginate) => {
  const [paramsSaveHook,setParamsSaveHook] = useState(paramsFunction); 
  const [page, setPage] = useState<any>(() => {
   try {
    //Aramis: Esto lo que hace es ver si existe algo guardado en L.S, si hay algo entonces obtenemos lo de la primera pagina
    //Si no hay nada, entonces definimos un array vacio
    const savedPagesJson = window.localStorage.getItem(key);
    const savePages =  savedPagesJson && JSON.parse(savedPagesJson)
    return savedPagesJson ? savePages[0]: []
   } catch (error) {
     console.error(error)
   }
  })

  useEffect(()=>{
    try {
      if(asynchronousFunction && !page.length) {
        //Aramis:Trae y guarda los primeros productos cuando el componente se monta.
        paramsSaveHook["pageNumber"] = 1
        console.log(paramsSaveHook,"useEffect")
        asynchronousFunction(paramsSaveHook).then((firstPage:any) => {
          const pages = [firstPage] 
          window.localStorage.setItem(key,JSON.stringify(pages))
          setPage(firstPage)})
      }
    } catch (error) {
      console.error(error)
    }
  },[paramsSaveHook])

  const nextPaginate = async (pageNumber:number) => {
    const isPageSaved = verifyPageInLocalStorage(key,pageNumber) 
    if(isPageSaved) {
       setPage(isPageSaved)
       return
    }
    paramsSaveHook["pageNumber"] = pageNumber;
    asynchronousFunction(paramsSaveHook).then((newPage:any) => {
      //Aramis: estas dos lineas de abajo podria hacerlas como un general de todo el hook o una funcion
      const savedPagesJson = window.localStorage.getItem(key)
      const savedPages = savedPagesJson &&  JSON.parse(savedPagesJson)
      savedPages[pageNumber] = newPage
      window.localStorage.setItem(key,JSON.stringify(savedPages))
      setPage(newPage)
    })
  };
  const modifyParams = (newParamsFunction:any)=> {
    console.log(newParamsFunction)
    window.localStorage.removeItem(key)
    setPage([])
    setParamsSaveHook(newParamsFunction)
  } 
  return [page,setPage,nextPaginate,modifyParams]
}
