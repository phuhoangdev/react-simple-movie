import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../components/movie/MovieCard";

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MovieDetailsPage = () => {
     const { movieId } = useParams();
     const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

     if (!data) return null;
     const { backdrop_path, poster_path, title, genres, overview } = data;

     return (
          <div className="py-10">
               <div className="w-full h-[600px] relative">
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div
                         className="w-full h-full bg-cover bg-no-repeat"
                         style={{
                              backgroundImage: `url(${tmdbAPI.image500(backdrop_path)})`,
                         }}
                    ></div>
               </div>
               <div className="w-full h-[400px] max-w-[650px] mx-auto -mt-[200px] relative z-10 pb-10">
                    <img src={tmdbAPI.image500(poster_path)} alt={title} className="w-full h-full object-cover object-top rounded-xl" />
               </div>
               <h1 className="text-center text-3xl font-bold text-white mb-10">{title}</h1>
               {genres && genres.length > 0 && (
                    <div className="flex items-center justify-center gap-x-5 mb-10">
                         {genres.map((item) => (
                              <span className="py-2 px-4 border-primary text-primary border rounded" key={item.id}>
                                   {item.name}
                              </span>
                         ))}
                    </div>
               )}
               <p className="text-center leading-relaxed max-w-[800px] mx-auto mb-10">{overview}</p>
               <MovieCredits />
               <MovieVideo />
               <MovieSimilar />
          </div>
     );
};

function MovieCredits() {
     const { movieId } = useParams();
     const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
     if (!data) return null;
     const { cast } = data;
     if (!cast || cast.length <= 0) return null;
     return (
          <div className="py-10">
               <h2 className="text-center text-3xl mb-10">Casts</h2>
               <div className="grid grid-cols-4 gap-5">
                    {cast.slice(0, 4).map((item) => (
                         <div className="cast-item" key={item.id}>
                              <img
                                   src={tmdbAPI.imageOriginal(item.profile_path)}
                                   alt={item.name}
                                   className="w-full h-[350px] object-cover rounded-lg mb-3"
                              />
                              <h3 className="text-xl font-medium text-center">{item.name}</h3>
                         </div>
                    ))}
               </div>
          </div>
     );
}

function MovieVideo() {
     const { movieId } = useParams();
     const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
     if (!data) return null;
     const { results } = data;
     if (!results || results.length <= 0) return null;

     return (
          <div className="py-10">
               <div className="flex flex-col gap-5">
                    {results.slice(0, 2).map((item) => (
                         <div key={item.id}>
                              <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">{item.name}</h3>
                              <div className="w-full aspect-video">
                                   <iframe
                                        width="853"
                                        height="480"
                                        src={`https://www.youtube.com/embed/${item.key}`}
                                        title={item.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full object-fill"
                                   ></iframe>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
}

function MovieSimilar() {
     const { movieId } = useParams();
     const { data, error } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
     if (!data) return null;
     const { results } = data;
     if (!results || results.length <= 0) return null;

     return (
          <div className="p-10">
               <h2 className="text-3xl font-medium mb-10">Similar Movies</h2>
               <div className="movie-list">
                    <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                         {results.map((item) => (
                              <SwiperSlide key={item.id}>
                                   <MovieCard item={item} />
                              </SwiperSlide>
                         ))}
                    </Swiper>
               </div>
          </div>
     );
}

export default MovieDetailsPage;
