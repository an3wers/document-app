import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Search() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isResult, setIsResult] = useState(false);

  const navigate = useNavigate()

  // Delay
  useEffect(() => {
    const timeout = setTimeout(async () => {
      // request
      if (search) {
        try {
          const res = await axios.post(
            "http://localhost:5000/api/documents/search",
            { search }
          );
          console.log("Search res", res.data.data);

          // TODO: fix data.data
          if(res.data.data.length) {
            setResult(res.data.data)
          } 
          setIsResult(true)
        } catch (error) {
          console.log(error.message);
        }
      }
    }, 800);
    return () => clearTimeout(timeout);
  }, [search]);

  const closeResultHandler = () => {
    setIsResult(false)
    setResult([])
  }

  const resultHandler = (id) => {
    // navigate to Document page
    navigate(`/${id}`)
  }

  return (
    <div className='mb-5'>
      <h3 className='mb-3'>Найти документ</h3>
      <div className='app-search'>
        <div className='app-search__field'>
          <input
            type='text'
            value={search}
            className='form-control'
            onChange={(e) => setSearch(e.target.value)}
            aria-label='search'
            placeholder='Найти по номеру, ФИО или паспорту'
          ></input>
        </div>

        {isResult && 
          <div className='app-search__result'>

            {
              result.length
                ? result.map(item => {
                  return <div key={item.id} onClick={() => resultHandler(item.id)} className="app-search__result-item">{item.lastname} {item.firstname} {item.patronymic}</div>
                })
                : <p className="text-center py-5">Результаты не найдены</p> 
            }

            
          </div>
          }
          {
            isResult &&
            <div className="search-overlay" onClick={closeResultHandler}></div>
          }
      </div>
      
    </div>
  );
}

export default Search;
