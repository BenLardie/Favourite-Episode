import React, { useEffect } from 'react'
import { Store } from './Store'

interface IEpisode {
  airdate: string
  airstamp: string
  airtime: string
  id: number
  image: { medium: string; original: string }
  name: string
  number: number
  runtime: number
  season: number
  summary: string
  url: string
}


export default function App():JSX.Element {
  const {state, dispatch} = React.useContext(Store)

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  },[])

  const fetchDataAction = async () => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=the-office&embed=episodes'
    const data = await fetch(URL)
    const dataJSON = await data.json()
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  return (
    <>
      <header className='header'>
      <h1>The Office</h1>
      <p>Pick your favourite episode!!</p>
      </header>
      <section className='episode-layout'>
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className='episode-box'>
              <img src={episode.image.medium} alt={episode.name} />
              <div>{episode.name}</div>
              <section>
                Season: {episode.season} Episode Number: {episode.number}
              </section>

            </section>
          )
        })}
      </section>
    </>
  )
}

