import React, { useEffect } from 'react'
import { Store } from './Store'
import { IAction, IEpisode } from './Interfaces'

const EpisodeList = React.lazy<any>(() => import('./EpisodeList'))

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

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode)
    let displayObj = {
      type: 'ADD_FAV',
      payload: episode
    }
    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter((fav: IEpisode) => fav.id !== episode.id)
      displayObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      }
    }
    return dispatch(displayObj)
  }
  const props = {
    episodes: state.episodes,
    toggleFavAction,
    favourites: state.favourites,
  }
  return (
    <>
      <header className='header'>
        <h1>The Office</h1>
        <p>Pick your favourite episode!!</p>
      </header>
      <React.Suspense fallback={<div>loading...</div>}>
      <section className='episode-layout'>
        <EpisodeList {...props} />
      </section>
      </React.Suspense>
    </>
  )
}

