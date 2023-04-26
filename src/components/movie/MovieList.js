import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/scss';
import MovieCard from './MovieCard';

const MovieList = () => {
   return (
      <div className="movie-list">
         <Swiper grabCursor={'true'} spaceBetween={40} slidesPerView={'auto'}>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
               <MovieCard />
            </SwiperSlide>
         </Swiper>
      </div>
   );
};

export default MovieList;
