import  { createContext, useState} from 'react'
import React from 'react'

    export const NextContext  = createContext()
  
    const Next = ({children}) => {
        const [next,setNext] = useState(null)
       
      return (
        <NextContext.Provider value={{next,setNext}}>
            {children}
        </NextContext.Provider>
      )
    }
    
    export default Next