import React, { useEffect } from 'react'

const Refresh = () => {

    useEffect(() => {
        const handleBeforeUnload = (e) => {
          e.preventDefault();
          e.returnValue = ''; // Some browsers require this for the dialog to show up.
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
}

export default Refresh