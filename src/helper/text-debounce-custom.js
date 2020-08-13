import { useState, useEffect } from 'react'

function useDebounceCustom(value, delay = 500) {
    const [text, setText] = useState("");
  
    useEffect(() => {
      const timeOut = setTimeout(() => {
        setText(value);
      }, delay);
  
      return () => {
        clearTimeout(timeOut);
      };
    }, [value, delay]);
    return text;
  }

  export default useDebounceCustom;