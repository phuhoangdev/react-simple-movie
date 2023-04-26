import MovieList from './components/movie/MovieList';

const App = () => {
   return (
      <>
         <header className="flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
            <span className="text-primary">Home</span>
            <span>Movies</span>
         </header>
         <section className="banner h-[500px] page-container mb-20">
            <div className="relative w-full h-full rounded-lg">
               <div className="overlay absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.2)] to-black rounded-lg "></div>
               <img
                  className="object-cover w-full h-full rounded-lg"
                  src="https://vtv1.mediacdn.vn/2019/4/26/poster-payoff-1-1556273680151870157160-crop-1556273779257196175768.jpg"
                  alt=""
               />
               <div className="absolute w-full text-white left-5 bottom-5">
                  <h2 className="mb-5 text-3xl font-bold">Avengers: Endgame</h2>
                  <div className="flex items-center mb-8 gap-x-3">
                     <span className="px-4 py-2 border border-gray-400 rounded-md">Action</span>
                     <span className="px-4 py-2 border border-gray-400 rounded-md">Adventure</span>
                     <span className="px-4 py-2 border border-gray-400 rounded-md">Drama</span>
                  </div>
                  <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">Watch Now</button>
               </div>
            </div>
         </section>

         <section className="pb-20 movies-layout page-container">
            <h2 className="mb-10 text-3xl text-white capitalize">Now playing</h2>
            <MovieList />
         </section>

         <section className="pb-20 movies-layout page-container">
            <h2 className="mb-10 text-3xl text-white capitalize">Top rated</h2>
            <div className="grid grid-cols-4 gap-10 movie-list">
               <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
                  <img
                     className="w-full h-[250px] object-cover rounded-lg mb-5"
                     src="https://vtv1.mediacdn.vn/2019/4/26/poster-payoff-1-1556273680151870157160-crop-1556273779257196175768.jpg"
                     alt=""
                  />
                  <h3 className="mb-3 text-xl font-bold">Spiderman: Homecoming</h3>
                  <div className="flex items-center justify-between mb-10 text-sm opacity-50">
                     <span>2017</span>
                     <span>7.4</span>
                  </div>
                  <button className="w-full px-6 py-3 rounded-lg bg-primary">Watch now</button>
               </div>
            </div>
         </section>

         <section className="pb-20 movies-layout page-container">
            <h2 className="mb-10 text-3xl text-white capitalize">Trending</h2>
            <div className="grid grid-cols-4 gap-10 movie-list">
               <div className="p-3 text-white rounded-lg movie-card bg-slate-800">
                  <img
                     className="w-full h-[250px] object-cover rounded-lg mb-5"
                     src="https://vtv1.mediacdn.vn/2019/4/26/poster-payoff-1-1556273680151870157160-crop-1556273779257196175768.jpg"
                     alt=""
                  />
                  <h3 className="mb-3 text-xl font-bold">Spiderman: Homecoming</h3>
                  <div className="flex items-center justify-between mb-10 text-sm opacity-50">
                     <span>2017</span>
                     <span>7.4</span>
                  </div>
                  <button className="w-full px-6 py-3 rounded-lg bg-primary">Watch now</button>
               </div>
            </div>
         </section>
      </>
   );
};

export default App;
