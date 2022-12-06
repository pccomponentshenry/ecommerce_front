import React from 'react';
//import background from '../../img/404.jpg'
import S from '../styles/NoProducts.module.css'

export default function NoProducts() {

  return (
    <div className={S.container}>
      <div className={S.detail}>No Products Found</div>
    </div >
  )
}