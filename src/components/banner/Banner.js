import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import { useNavigate } from "react-router-dom";
import Button from "components/button/Button";

const Banner = ({ type = "upcoming" }) => {
     const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
     const movies = data?.results || [];

     return (
          <section className="banner h-[500px] page-container mb-20 overflow-hidden">
               <Swiper grabCursor={"true"} slidesPerView={"auto"}>
                    {movies &&
                         movies.length > 0 &&
                         movies.map((item) => (
                              <SwiperSlide key={item.id}>
                                   <BannerItem item={item} />
                              </SwiperSlide>
                         ))}
               </Swiper>
          </section>
     );
};

function BannerItem({ item }) {
     const { id, title, poster_path } = item;
     const navigate = useNavigate();

     return (
          <div className="relative w-full h-full rounded-lg">
               <div className="overlay absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-black rounded-lg "></div>
               <img className="object-cover w-full h-full rounded-lg" src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title} />
               <div className="absolute w-full text-white left-5 bottom-5">
                    <h2 className="mb-5 text-3xl font-bold">{title}</h2>
                    <div className="flex items-center mb-8 gap-x-3">
                         <span className="px-4 py-2 border border-gray-400 rounded-md">Action</span>
                         <span className="px-4 py-2 border border-gray-400 rounded-md">Adventure</span>
                         <span className="px-4 py-2 border border-gray-400 rounded-md">Drama</span>
                    </div>
                    <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
               </div>
          </div>
     );
}

export default Banner;
