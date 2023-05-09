import MovieCard from "../components/movie/MovieCard";
import useSWR from "swr";
import { fetcher, apiKey } from "../config";
import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useEffect } from "react";

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
const pageCount = 5;

const MoviePage = () => {
     const [nextPage, setNextPage] = useState(1);
     const [filter, setFilter] = useState("");
     const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nextPage}`);
     const filterDebounce = useDebounce(filter, 500);
     const { data, error } = useSWR(url, fetcher);
     const loading = !data && !error;

     const handleFilterChange = (e) => {
          setFilter(e.target.value);
     };

     useEffect(() => {
          if (filterDebounce) {
               setUrl(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebounce}&page=${nextPage}`);
          } else {
               setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${nextPage}`);
          }
     }, [filterDebounce, nextPage]);

     if (!data) return null;
     const movies = data?.results || [];
     // const { page, total_pages } = data;

     return (
          <div className="py-10 page-container">
               <div className="flex mb-10">
                    <div className="flex-1">
                         <input
                              onChange={handleFilterChange}
                              type="text"
                              className="w-full p-4 text-white outline-none bg-slate-800"
                              placeholder="Type here to search..."
                         />
                    </div>
                    <button className="p-4 text-white bg-primary">
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              />
                         </svg>
                    </button>
               </div>
               {loading && (
                    <div className="w-10 h-10 mx-auto border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
               )}

               <div className="grid grid-cols-4 gap-10">
                    {!loading && movies && movies.length > 0 && movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
               </div>
               <div className="flex items-center justify-center mt-10 gap-x-5">
                    <span className="cursor-pointer" onClick={() => setNextPage(nextPage - 1)}>
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                         >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                         </svg>
                    </span>
                    {new Array(pageCount).fill(0).map((item, index) => (
                         <span
                              onClick={() => setNextPage(index + 1)}
                              className="inline-block w-10 h-10 p-2 text-center bg-white rounded-full cursor-pointer text-slate-900"
                         >
                              {index + 1}
                         </span>
                    ))}
                    <span className="cursor-pointer" onClick={() => setNextPage(nextPage + 1)}>
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                         >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                         </svg>
                    </span>
               </div>
          </div>
     );
};

export default MoviePage;
