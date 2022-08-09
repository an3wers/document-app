import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Document() {
  const [document, setDocument] = useState({});

  const params = useParams();
  const navigate = useNavigate()
  // console.log(params)

  const loadDocument = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/documents/detail",
        { id }
      );
      setDocument(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDocument(params.id);
  }, []);

  return (
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6 col-sm-12'>
          <h1 className='mb-5'>Документ</h1>
            <div className="mb-3 ms-n2"><button style={{marginLeft:"-0.5rem"}} onClick={() => navigate(-1)} className="btn btn-link btn-sm">Вернуться на главную</button></div>
          <div className='card'>
            {Object.keys(document).length ? (
              <div className='card-body'>
                <p>Фамилия: {document.lastname}</p>
                <p>Имя: {document.firstname}</p>
                <p>Отчество: {document.patronymic}</p>
                <p>
                  Паспорт: {document.series} {document.number}
                </p>
              </div>
            ) : (
              <div className='card-body'>Документ не найден</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Document;
