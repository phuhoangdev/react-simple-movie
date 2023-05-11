import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";

// https://api.themoviedb.org/3/movie/now_playing?api_key=33aec3e46513194f2d716e9b0bc14bf5

const MovieList = ({ type = "now_playing" }) => {
     const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
     const isLoading = !data && !error;
     const movies = data?.results || [];

     return (
          <div className="movie-list">
               {isLoading && (
                    <>
                         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                              <SwiperSlide>
                                   <MovieCardSkeleton />
                              </SwiperSlide>
                              <SwiperSlide>
                                   <MovieCardSkeleton />
                              </SwiperSlide>
                              <SwiperSlide>
                                   <MovieCardSkeleton />
                              </SwiperSlide>
                              <SwiperSlide>
                                   <MovieCardSkeleton />
                              </SwiperSlide>
                         </Swiper>
                    </>
               )}

               {!isLoading && (
                    <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                         {movies &&
                              movies.length > 0 &&
                              movies.map((item) => (
                                   <SwiperSlide key={item.id}>
                                        <MovieCard item={item} />
                                   </SwiperSlide>
                              ))}
                    </Swiper>
               )}
          </div>
     );
};

MovieList.propTypes = {
     type: PropTypes.string.isRequired,
};

function FallbackComponent() {
     return <p className="text-red-400 bg-red-50">Something went wrong</p>;
}

export default withErrorBoundary(MovieList, {
     FallbackComponent,
});
