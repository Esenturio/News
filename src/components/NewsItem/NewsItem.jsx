import React from 'react'
import styles from './NewsItem.module.css'

function NewsItem({thumb, title, describe, author, more}) {
  return (
    <div className={styles.table__item + ' mb-2 row '}>
      <div className={styles.item__image + ' col-3 col p-0'}>
        <img src={thumb} alt="news thumbnail" />
      </div>
      <div className={styles.item__info + ' col-9 col d-flex flex-column'}>
        <div className="item__title h4">
          {title}
        </div>
        <div className={styles.item__body}>
          {describe}
        </div>
        <div className="item__footer d-flex justify-content-between align-items-center mt-auto mb-2">
          <div className="item__author">
            Автор: {author}
          </div>
          <div className="item__more mt-auto">
            <button className='btn btn-success' onClick={more}>Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem