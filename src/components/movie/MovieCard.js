const MovieCard = () => {
   return (
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
   );
};

export default MovieCard;
