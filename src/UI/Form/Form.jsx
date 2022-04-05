import React from 'react'
import './Form.css'

function Form({children, submit, handler, title, describe, descrition, cats, fileHandler}) {
  return (
    <div className='form'>
      <h1 className='h1'>{children}</h1>
      <form onSubmit={submit} className='grid justify-content-between '>
        <div className="form__f-block">
          <div className="form-wrap">
            <label htmlFor="form__category">Категория</label>
            <select name="category" className='form-select' id='form__category' onChange={handler}>
              <option value="choosed" selected hidden>Выбери категорию</option>
              {cats.map((item, index) => {
                return <option key={index} value={item.category}>{item.category}</option>
              })}
            </select>
          </div>
          <div className="form__wrap">
            <label htmlFor="form__title">Заголовок</label>
            <input placeholder='Введи заголовок' className='form-control' id='form__title' type="text" name='title' onChange={handler} value={title} />
          </div>
          <div className="form__wrap">
            <label htmlFor="form__describe">Краткое описание</label>
            <textarea rows='8' placeholder='Введи краткое описание' className='form-control' id='form__describe' type="text" name='describe' onChange={handler} value={describe} />
          </div>
          <div className="form__file">
            <label htmlFor="formFile" className="form-label">Выбери изображение</label>
            <input className="form-control" type="file" name='thumbnail' id="formFile" onChange={fileHandler}/>
          </div>
        </div>
        <div className="form__s-block">
          <div className="form__wrap">
            <label htmlFor="form__description">Полное описание</label>
            <textarea rows='13' placeholder='Введи полное описание' className='form-control' id='form__description' type="text" name='description' onChange={handler} value={descrition} />
          </div>
        </div>
        <button className='btn btn-primary d-inline-block'>Отправить</button>
      </form>
    </div>
  )
}

export default Form