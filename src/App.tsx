import React, { useEffect } from 'react'
import { Store} from './Store'
import {IAction, IEpisode} from './Interfaces'


export default function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store)

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  }, [])

  const fetchDataAction = async () => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=the-office&embed=episodes'
    const data = await fetch(URL)
    const dataJSON = await data.json()
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  const toggleFavAction = (episode: IEpisode): IAction => dispatch({
    type: 'ADD_FAV',
    payload: episode
  })
  console.log(state)
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
                <div>Season: {episode.season} Episode Number: {episode.number}</div>
                <button type='button' onClick={() => toggleFavAction(episode)}>Fav</button>
              </section>
            </section>
          )
        })}
      </section>
    </>
  )
}

