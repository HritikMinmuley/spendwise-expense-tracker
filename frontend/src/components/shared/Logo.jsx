import React from 'react'
import { Link } from 'react-router-dom'

export const Logo = () => {
  return (
    <Link to='/'>
        <img src="./src/assets/expense_logo.png" alt="logo"
        className='w-26'
        />
    </Link>
  )
}
