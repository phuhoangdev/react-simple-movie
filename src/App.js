import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MoviePageInfinite = lazy(() => import("./pages/MoviePageInfinite"));

const App = () => {
     return (
          <>
               <Suspense fallback={<></>}>
                    <Routes>
                         <Route element={<Main />}>
                              <Route
                                   path="/"
                                   element={
                                        <>
                                             <Banner />
                                             <HomePage />
                                        </>
                                   }
                              />
                              <Route
                                   path="/movies"
                                   element={
                                        <>
                                             <MoviePageInfinite />
                                        </>
                                   }
                              />
                              <Route
                                   path="/movie/:movieId"
                                   element={
                                        <>
                                             <MovieDetailsPage />
                                        </>
                                   }
                              />
                              <Route path="*" element={<>Not Found</>}></Route>
                         </Route>
                    </Routes>
               </Suspense>
          </>
     );
};

export default App;
