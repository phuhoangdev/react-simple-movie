import MovieList from '../components/movie/MovieList';

const HomePage = () => {
   return (
      <>
         <section className="pb-20 movies-layout page-container">
            <h2 className="mb-10 text-3xl text-white capitalize">Now playing</h2>
            <MovieList />
         </section>

         <section className="pb-20 movies-layout page-container">
            <h2 className="mb-10 text-3xl text-white capitalize">Top rated</h2>
            <MovieList type="top_rated" />
         </section>

         <section className="pb-20 movies-layout page-container">
            <h2 className="mb-10 text-3xl text-white capitalize">Trending</h2>
            <MovieList type="popular" />
         </section>
      </>
   );
};

export default HomePage;
