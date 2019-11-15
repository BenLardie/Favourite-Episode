import React from 'react'
import { IEpisode } from './Interfaces'

export default function EpisodeList(props: any): Array<JSX.Element> {
    const { episodes, toggleFavAction, favourites, store } = props
    const { state, dispatch } = store
    return episodes.map((episode: IEpisode) => {
        return (
            <section key={episode.id} className='episode-box'>
                <div className='title-box'>
                <h1 className='card-header'>{episode.name}</h1>
                <button type='button' 
                    onClick={() => toggleFavAction(state, dispatch, episode)}
                    className={favourites.find((fav: IEpisode) => fav.id === episode.id) ?
                        'heart is-active'
                        : 'heart'}
                    >
                </button>
                </div>
                <img src={episode.image.original} alt={episode.name} className='card-image' />
                <section className='text'>
                    <div>Season: {episode.season} Episode Number: {episode.number}</div>
                    <div className='details'>{episode.summary.replace('<p>', '').replace('</p>', '')}</div>
                </section>
            </section>
        )
    })
}

