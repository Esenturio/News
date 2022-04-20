import React from 'react'
import './Form.css'

function Form({children, submit, handler, title, describe, cat, descrition, fileHandler, img, none = false}) {
  return (
    <div className='form'>
      <h1 className='h1 mt-2 mb-3 green'>{children}</h1>
      <form onSubmit={submit} className='grid justify-content-between '>
        <div className="form__f-block">
          <div className="form__wrap form-floating mb-3">
            <input placeholder='Введи категорию' className='form-control' id='form__cat' type="text" name='categor' onChange={handler} value={cat} />
            <label htmlFor="form__cat">Категория</label>
          </div>
          <div className="form__wrap form-floating mb-3">
            <input placeholder='Введи заголовок' className='form-control' id='form__title' type="text" name='title' onChange={handler} value={title} />
            <label htmlFor="form__title">Заголовок</label>
          </div>
          <div className="form__wrap mb-2 form-floating mb-3">
            <textarea rows='8' placeholder='Введи краткое описание' className='form-control' id='form__describe' type="text" name='describe' onChange={handler} value={describe} />
            <label htmlFor="form__describe">Краткое описание</label>
          </div>
          {none ? <div/> : (
            <div className="form__file d-flex">
              <div className="form__image">
                <img src={img} alt="news thumbnail" className='me-2' />
              </div>
              <div className="form__file-body">
                <label htmlFor="formFile" className="form-label">Выбери изображение</label>
                <input className="form-control" type="file" accept='image/*' name='thumbnail' id="formFile" onChange={fileHandler}/>
              </div>
            </div>
          )}
        </div>
        <div className="form__s-block">
          <div className="form__wrap form-floating">
            <textarea rows='13' placeholder='Введи полное описание' className='form-control' id='form__description' type="text" name='description' onChange={handler} value={descrition} />
            <label htmlFor="form__description">Полное описание</label>
          </div>
        </div>
        <button className='btn btn-primary d-inline-block'>Отправить</button>
      </form>
    </div>
  )
}

export default Form