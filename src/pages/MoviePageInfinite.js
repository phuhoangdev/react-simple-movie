import { fetcher, tmdbAPI } from "apiConfig/config";
import { useState } from "react";
import useDebounce from "hooks/useDebounce";
import { useEffect } from "react";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import { v4 } from "uuid";
import Button from "components/button/Button";
import useSWRInfinite from "swr/infinite";

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>
const itemsPerPage = 20;

const MoviePage = () => {
     const [pageCount, setPageCount] = useState(0);
     const [itemOffset, setItemOffset] = useState(0);
     const [nextPage, setNextPage] = useState(1);
     const [filter, setFilter] = useState("");
     const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
     const filterDebounce = useDebounce(filter, 500);

     const handleFilterChange = (e) => {
          setFilter(e.target.value);
     };

     const { data, error, size, setSize } = useSWRInfinite((index) => url.replace("page=1", `page=${index + 1}`), fetcher);
     const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
     const loading = !data && !error;
     const isEmpty = data?.[0]?.results.length === 0;
     const isReachingEnd = isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);

     useEffect(() => {
          if (filterDebounce) {
               setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
          } else {
               setUrl(tmdbAPI.getMovieList("popular", nextPage));
          }
     }, [filterDebounce, nextPage]);

     useEffect(() => {
          if (!data || !data.total_results) return;
          setPageCount(Math.ceil(data.total_results / itemsPerPage));
     }, [data, itemOffset]);

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
                    <div className="grid grid-cols-4 gap-10">
                         {new Array(itemsPerPage).fill(0).map(() => (
                              <MovieCardSkeleton key={v4()} />
                         ))}
                    </div>
               )}

               <div className="grid grid-cols-4 gap-10">
                    {!loading && movies && movies.length > 0 && movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
               </div>
               <div className="mt-10 text-center">
                    <Button
                         onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
                         disabled={isReachingEnd}
                         className={`${isReachingEnd ? "hidden" : ""}`}
                    >
                         Load More
                    </Button>
               </div>
          </div>
     );
};

export default MoviePage;
