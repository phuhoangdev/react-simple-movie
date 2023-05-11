export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "33aec3e46513194f2d716e9b0bc14bf5";

const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
     getMovieList: (type, page = 1) => `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
     getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
     getMovieMeta: (movieId, type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
     getMovieSearch: (query, page = 1) => `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
     imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
     image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
