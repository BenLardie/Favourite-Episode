import { IAction, IEpisode, IState } from './Interfaces'

export const fetchDataAction = async (dispatch: any) => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=the-office&embed=episodes'
    const data = await fetch(URL)
    const dataJSON = await data.json()
    return dispatch({
        type: 'FETCH_DATA',
        payload: dataJSON._embedded.episodes
    })
}


export const toggleFavAction = (state: IState, dispatch: any, episode: IEpisode | any): IAction => {
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