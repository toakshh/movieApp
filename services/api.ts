export const TMDB_CONFIG = {
    Base_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query:string}) => {
     const endpoint = query 
        ? `${TMDB_CONFIG.Base_URL}/search/movie?query=${encodeURIComponent(query)}` 
        : `${TMDB_CONFIG.Base_URL}/discover/movie?sort_by=popularity.desc`

     const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
     })
     if(!response.ok){
         // @ts-ignore
        throw new Error('Failed to fetch movies', response.statusText)
     }

     const data = await response.json()
     return data
}

export const fetchMovieDetails = async (id: string) => {
    try{

        const response = await fetch(`${TMDB_CONFIG.Base_URL}/movie/${id}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        })
        if(!response.ok){
            // @ts-ignore
            throw new Error('Failed to fetch movie details', response.statusText)
        }
        
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
    }
}


