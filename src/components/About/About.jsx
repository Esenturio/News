import React from 'react'
import styles from 'styled-components'
import man from '../../assets/man.webp'
import about from '../../assets/about.png'
import axios from '../../api/axios'
import { useEffect } from 'react';
import { useState } from 'react';
import getImage from '../../helpers/getImage'

const AboutBlock = styles.div`
  max-width: 800px;

  .title {
    color: var(--main-color);
  }

  .content {
    color: var(--text-color);
    font-size: 1.1rem
  }

  .first__part, .second__part {
    max-width: 100vw
  }
`

export default function About() {
  const [about, setAbout] = useState({})

  useEffect(async () => {
    let res = await axios.get('/api/about-id?populate=*');
    console.log(res);
    let data = res.data.data.attributes
    data.first_img = getImage(data.first_image, true)
    data.second_img = getImage(data.second_image, true)
    setAbout(data)
  }, [])

  return (
    <AboutBlock className='m-auto p-2 pt-0 pb-0'>
      <h1 className='h2 title'>О нас</h1>
      <div className="first__part row mb-3">
        <img src={about.first_image} alt="about us image" className='first__image col col-md-6 col-sm-12' />
        <div className="first__content content ps-2 col col-md-6 col-sm-12">
          <p>{about.first}</p>
        </div>
      </div>
      <h1 className="h2 title">
        Почему мы?
      </h1>
      <div className="second__part row">
        <img src={about.second_image} className='second__image col-12 mb-2' alt="comand picture" />
        <div className="second__content content col-12 mt-2">
          <p>{about.second}</p>
        </div>
      </div>
    </AboutBlock>
  )
}
