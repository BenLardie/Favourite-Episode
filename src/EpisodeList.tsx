import React from 'react'
import { IEpisode } from './Interfaces'

export default function EpisodeList(props: any): Array<JSX.Element> {
    const { episodes, toggleFavAction, favourites, store } = props
    const { state, dispatch } = store
    return episodes.map((episode: IEpisode) => {
        return (
            <section key={episode.id} className='episode-box'>
                <img src={episode.image.medium} alt={episode.name} />
                <div>{episode.name}</div>
                <section>
                    <div>Season: {episode.season} Episode Number: {episode.number}</div>
                    <div className='details'>{episode.summary.replace('<p>', '').replace('</p>', '')}</div>
                    <button type='button' onClick={() => toggleFavAction(state, dispatch, episode)}>{favourites.find((fav: IEpisode) => fav.id === episode.id) ?
                        'Remove Fav'
                        : 'Fav'}
                    </button>
                </section>
            </section>
        )
    })
}

