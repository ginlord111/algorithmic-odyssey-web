import { useEffect, useState } from 'react'

const useDebounce = <T>(value:T, delay?:number):T => {
    const [debounceInput, setDebounceInput] = useState<T>(value)
    useEffect(()=> {
        const timer = setTimeout(()=>{
            setDebounceInput(value)
        }, delay ?? 500)

        return () => clearTimeout(timer)
    },[value, delay])

    return debounceInput
}

export default useDebounce