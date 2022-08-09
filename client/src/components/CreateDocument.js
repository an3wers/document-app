import { useState } from "react";

function CreateDocument(props) {
  const [document, setDocument] = useState({
    lastname: "",
    firstname: "",
    patronymic: "",
    series: "",
    number: "",
  });

  const createDoc = (e) => {
    e.preventDefault();
    props.create(document);
    setDocument({
      lastname: "",
      firstname: "",
      patronymic: "",
      series: "",
      number: "",
    });
  };

  return (
    <div className='mb-5 mt-3'>
      <h3 className='my-3'>Создать документ</h3>
      <form>
        <div className='mb-3'>
          <label className='form-label'>Фамилия</label>
          <input
            type='text'
            value={document.lastname}
            onChange={(e) =>
              setDocument({ ...document, lastname: e.target.value })
            }
            className='form-control'
            aria-label='lastname'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Имя</label>
          <input
            type='text'
            className='form-control'
            value={document.firstname}
            onChange={(e) =>
                setDocument({ ...document, firstname: e.target.value })
              }
            aria-label='firstname'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Отчество</label>
          <input
            type='text'
            className='form-control'
            value={document.patronymic}
            onChange={(e) =>
                setDocument({ ...document, patronymic: e.target.value })
              }
            aria-label='patronymic'
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Паспорт</label>
          <div className='row'>
            <div className='col'>
              <input
                type='number'
                className='form-control'
                value={document.series}
                onChange={(e) =>
                    setDocument({ ...document, series: e.target.value })
                  }
                placeholder='Серия'
                aria-label='series'
              />
            </div>
            <div className='col'>
              <input
                type='number'
                className='form-control'
                value={document.number}
                onChange={(e) =>
                    setDocument({ ...document, number: e.target.value })
                  }
                placeholder='Номер'
                aria-label='number'
              />
            </div>
          </div>
        </div>
        <button type='submit' disabled={!document.lastname || !document.firstname || !document.series || !document.number} onClick={createDoc} className='btn btn-primary'>
          Создать документ
        </button>
      </form>
    </div>
  );
}

export default CreateDocument;
