import React, { useEffect, useState} from 'react'

function getSavedValue(key, initialValue){
    const savedVal = JSON.parse(localStorage.getItem(key));

    if(savedVal) return savedVal;

    if (typeof(initialValue) === 'function') return initialValue()

    return initialValue
}

export default function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
       localStorage.setItem(key, JSON.stringify(value))
    },[value])
  
    return [value, setValue]
}
