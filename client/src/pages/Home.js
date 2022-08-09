import CreateDocument from "../components/CreateDocument";
import Search from "../components/Search";
import axios from 'axios'
import { useState, useEffect } from "react";
import Informer from "../components/Informer";

function Home() {

    const [isAdded, setIsAdded] = useState(false)

    const createDocument = async (payload) => {
        try {
            const res = await axios.post('http://localhost:5000/api/documents/create', payload)
            setIsAdded(true)
            console.log('Создан документ', res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsAdded(false)
        }, 5000)
        return () => clearTimeout(timeout);
    }, [isAdded])

  return (
    
    <div className='container py-5'>
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-sm-12">
                <Search />
                {isAdded && <Informer text="Документ добавлен." />}
                <CreateDocument create={createDocument} />
            </div>
        </div>
    </div>
    
  ) 
}

export default Home;
