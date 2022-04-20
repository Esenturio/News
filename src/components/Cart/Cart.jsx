import React from 'react'
import './Cart.css'
import {motion} from 'framer-motion'

function Cart({title, thumb, describe, more, variants}) {
  return (
    <motion.div className='cart' variants={variants} whileInView={'visible'} initial={'hidden'} viewport={{amount: .3}}>
      <div className="cart__thumbnail">
        <img src={thumb} alt="cart thumbnail" className='cart__img' />
      </div>
      <div className="cart__body d-flex flex-column">
        <div className="cart__title h3">
          {title}
        </div>
        <div className="cart__describe mb-3 text-truncate">
          {describe}
        </div>
        <div className="cart__more mt-auto">
          <button className='btn btn-success' onClick={more}>Подробнее</button>
        </div>
      </div>
    </motion.div>
  )
}

export default Cart