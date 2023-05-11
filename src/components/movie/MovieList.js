import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";

// https://api.themoviedb.org/3/movie/now_playing?api_key=33aec3e46513194f2d716e9b0bc14bf5

const MovieList = ({ type = "now_playing" }) => {
     const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
     const movies = data?.results || [];

     return (
          <div className="movie-list">
               <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {movies &&
                         movies.length > 0 &&
                         movies.map((item) => (
                              <SwiperSlide key={item.id}>
                                   <MovieCard item={item} />
                              </SwiperSlide>
                         ))}
               </Swiper>
          </div>
     );
};

export default MovieList;
