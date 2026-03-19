import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import PhotoCard from './PhotoCard'
import useFetchPhotos from '../hooks/useFetchPhotos'
import useLocalStorage from '../hooks/useLocalStorage'


function photoReducer(state, action){
      switch(action.type){
          case "FetchPhotos" : 
            return [...state, ...action.payload]
          case "SetFavPhotos":
            return state.map(photo => {
                if(photo.id === action.payload && !photo.isFav){
                    return { ...photo, isFav: true }
                }else if(photo.id === action.payload && photo.isFav){
                    return { ...photo, isFav: false }
                }else {
                    return photo
                }
                
            })
          default :
            return state
      }
}


function Photographs({ searchTerm }) {

    const PhotosUrl = 'https://picsum.photos/v2/list?limit=30'
    const { loading , error, data : photos} = useFetchPhotos(PhotosUrl)

    const [favouritePhotos, setFavouritePhotos] = useLocalStorage("FavoritePhotos", [])

    const [state, dispatch] = useReducer(photoReducer, favouritePhotos);

    const LoadPhotos = useCallback(() => {
        if(photos != null){
            if(JSON.stringify(favouritePhotos) == JSON.stringify([])){
                 dispatch({ type: 'FetchPhotos', payload: photos})
            }
           
        }
    },[photos])


    useEffect(() => {

        LoadPhotos()
        
    },[LoadPhotos])

    useEffect(() => {
        setFavouritePhotos(state)  
    },[state])

    const filteredItems = useMemo(() => {

        console.log('Filtering items...');
        return favouritePhotos?.filter(photo =>
        photo.author.toLowerCase().includes(searchTerm.toLowerCase())
        );

    },[favouritePhotos, searchTerm])


    const photoComponent = () => {
        return (
             filteredItems.length ? filteredItems.map(photo => (
                 <PhotoCard key={photo.id} photo={photo} dispatch={dispatch} />
             )) : (<div>No Photos to show..</div>)
        )
    }

    if(error){
        console.log('com error',error.name)
        if(error.status) throw new Error(error.status)
        if(error.name == "AxiosError") throw new Error(error.name)
    }


  return (
    <div>
      {loading ? (
        <div className="animate-spin inline-block size-16 border-8 border-current border-t-transparent rounded-[999px] text-primary" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className='grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 place-items-center gap-4 justify-between m-4'>
            {photoComponent()}
        </div>
        
      )}
    </div>
  )
}

export default Photographs