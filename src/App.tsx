import React, { useEffect, useContext } from 'react'
import { Store } from './Store'


export default function App():JSX.Element {
  const [state, dispatch] = useContext(Store)

  useEffect(() => {
    state.episodes === 0 && fetchDataAction()
  })

  const fetchDataAction = async () => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=the-office&embed=episodes'
    const data = await fetch(URL)
    const dataJSON = await data.json()
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }
  console.log(state)

  return (
    <>
      <h1>Rick and Morty</h1>
      <p>Pick your favourite episode</p>
    </>
  )
}

