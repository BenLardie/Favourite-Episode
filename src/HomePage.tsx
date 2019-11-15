import React, { useEffect } from 'react'
import { Store } from './Store'
import { IEpisodeProps } from './Interfaces'
import { fetchDataAction, toggleFavAction } from './Actions'

const EpisodeList = React.lazy<any>(() => import('./EpisodeList'))

export default function HomePage() {
    const { state, dispatch } = React.useContext(Store)

    useEffect(() => {
        state.episodes.length === 0 && fetchDataAction(dispatch)
    }, [])

    const props: IEpisodeProps = {
        episodes: state.episodes,
        store: { state, dispatch },
        toggleFavAction,
        favourites: state.favourites,
    }
    return (
        <>
            <React.Suspense fallback={<div>loading...</div>}>
                <section className='episode-layout'>
                    <EpisodeList {...props} />
                </section>
            </React.Suspense>
        </>
    )
}
