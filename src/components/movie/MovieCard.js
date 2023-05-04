import { useNavigate } from 'react-router-dom';

const MovieCard = ({ item }) => {
   const { title, vote_average, release_date, poster_path, id } = item;
   const navigate = useNavigate();

   return (
      <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
         <img className="w-full h-[250px] object-cover rounded-lg mb-5" src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
         <div className="flex flex-col flex-1">
            <h3 className="mb-3 text-xl font-bold">{title}</h3>
            <div className="flex items-center justify-between mb-10 text-sm opacity-50">
               <span>{new Date(release_date).getFullYear()}</span>
               <span>{vote_average}</span>
            </div>
            <button onClick={() => navigate(`/movie/${id}`)} className="w-full px-6 py-3 mt-auto rounded-lg bg-primary">
               Watch now
            </button>
         </div>
      </div>
   );
};

export default MovieCard;
