import { Heart } from 'lucide-react'
import React from 'react'


function PhotoCard({ photo, dispatch }) {

  function handleClick(){
      dispatch({ type: "SetFavPhotos", payload: photo.id})
  }

  return (
    <div className='flex flex-col w-full h-100 lg:h-100 shadow-md shadow-mist-600 gap-1 outline-transparent rounded-lg'>
        <div className='relative'>
          <img src={photo.download_url} className='object-cover min-h-75 max-h-75 w-full z-10' />
          <Heart 
             className={`z-100 absolute right-2 bottom-5 hover:fill-red-600 text-red-600 ${photo.isFav ? "fill-red-600" : ""}`} size={30}
             onClick={handleClick}
          />
        </div>
        <div className='text-lg m-auto text-shadow-2xs'>Author : {photo.author}</div>
    </div>  
  ) 
}

export default PhotoCard