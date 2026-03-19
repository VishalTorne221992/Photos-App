import { useCallback, useState } from 'react';
import '../src/App.css'
import Photographs from './components/Photographs'
import { Search } from 'lucide-react'


function App() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = useCallback((e) => {
        setSearchTerm(e.target.value)
    },[searchTerm])


    return (
        <div className="@container/wrapper text-2xl w-full h-full flex flex-col">

            <header className='text-center'>
                <div className="Header text-7xl font-bold">Photos App</div>
            </header>

            <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-black flex justify-center">

               
                 <div className="relative md:w-100 lg:w-150">
                    <div className='absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none'>
                            <Search className="w-4 h-4" />
                    </div>

                    <input type="text" placeholder="Search" onChange={handleChange} className="h-36px relative pl-10 border
                      border-black/70 text-sm rounded-lg w-full py-2 px-3 focus:outline-none bg-transparent"/>
                </div>


            
            </nav>

            <div className='@container/main flex flex-col 
                 gap-y-5 items-center'>

                <main className='@container/photos w-full h-max text-center'>

                    <Photographs searchTerm={searchTerm}/>

                </main>

                <footer>

                </footer>
            </div>


        </div>
    )
}

export default App
