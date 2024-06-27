import  { createContext, useState} from 'react'
import React from 'react'

    export const CategContext  = createContext()
  
    const Categ = ({children}) => {
        const [result,setResult] = useState({
            d1 : 0 ,
            d2 : 0 ,
            d3 : 0 
        })
       
      return (
        <CategContext.Provider value={{result,setResult}}>
            {children}
        </CategContext.Provider>
      )
    }
    
    export default Categ