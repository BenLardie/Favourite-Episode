import React from 'react'
import { Link } from '@reach/router'



export default function App(props: any): JSX.Element {


  return (
    <>
      <header className='header'>
        <div>
          <h1>The Office</h1>
          <p>Pick your favourite episode!!</p>
        </div>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/favs'>Favourites</Link>
        </div>
      </header>
      {props.children}
    </>
  )
}

