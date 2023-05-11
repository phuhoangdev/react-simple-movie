import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "components/movie/MovieCard";

//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MovieDetailsPage = () => {
     const { movieId } = useParams();
     const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

     if (!data) return null;
     const { backdrop_path, poster_path, title, genres, overview } = data;

     return (
          <div className="py-10">
               <div className="w-full h-[600px] relative">
                    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                    <div
                         className="w-full h-full bg-no-repeat bg-cover"
                         style={{
                              backgroundImage: `url(${tmdbAPI.image500(backdrop_path)})`,
                         }}
                    ></div>
               </div>
               <div className="w-full h-[400px] max-w-[650px] mx-auto -mt-[200px] relative z-10 pb-10">
                    <img src={tmdbAPI.image500(poster_path)} alt={title} className="object-cover object-top w-full h-full rounded-xl" />
               </div>
               <h1 className="mb-10 text-3xl font-bold text-center text-white">{title}</h1>
               {genres && genres.length > 0 && (
                    <div className="flex items-center justify-center mb-10 gap-x-5">
                         {genres.map((item) => (
                              <span className="px-4 py-2 border rounded border-primary text-primary" key={item.id}>
                                   {item.name}
                              </span>
                         ))}
                    </div>
               )}
               <p className="text-center leading-relaxed max-w-[800px] mx-auto mb-10">{overview}</p>
               <MovieMeta type="credits" />
               <MovieMeta type="videos" />
               <MovieMeta type="similar" />
          </div>
     );
};

function MovieMeta({ type = "videos" }) {
     const { movieId } = useParams();
     const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
     if (!data) return null;

     if (type === "credits") {
          const { cast } = data;
          if (!cast || cast.length <= 0) return null;

          return (
               <div className="py-10">
                    <h2 className="mb-10 text-3xl text-center">Casts</h2>
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
     } else {
          const { results } = data;
          if (!results || results.length <= 0) return null;

          if (type === "videos") {
               return (
                    <div className="py-10">
                         <div className="flex flex-col gap-5">
                              {results.slice(0, 2).map((item) => (
                                   <div key={item.id}>
                                        <h3 className="inline-block p-3 mb-5 text-xl font-medium bg-secondary">{item.name}</h3>
                                        <div className="w-full aspect-video">
                                             <iframe
                                                  width="853"
                                                  height="480"
                                                  src={`https://www.youtube.com/embed/${item.key}`}
                                                  title={item.name}
                                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                  allowFullScreen
                                                  className="object-fill w-full h-full"
                                             ></iframe>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               );
          }

          if (type === "similar") {
               return (
                    <div className="p-10">
                         <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
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
     }

     return null;
}

export default MovieDetailsPage;
