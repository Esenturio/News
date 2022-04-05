import React from 'react'
import styles from './NewsItem.module.css'

function NewsItem({thumb, title, describe, author, more}) {
  return (
    <div className={styles.table__ite + ' border-1 border mb-2 p-3 row'}>
      <div className={styles.item__image + ' col-3 col'}>
        <img src={thumb} alt="news thumbnail" />
      </div>
      <div className={styles.item__info + ' col-9 col'}>
        <div className="item__title h4">
          {title}
        </div>
        <div className={styles.item__body}>
          {describe}
        </div>
        <div className="item__footer d-flex justify-content-between align-items-center">
          <div className="item__author">
            Автор: {author}
          </div>
          <div className="item__more">
            <button className='btn btn-success'>Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem