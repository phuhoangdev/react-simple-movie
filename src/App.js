import { Route, Routes } from 'react-router-dom';
import 'swiper/scss';
import Main from './components/layout/Main';
import HomePage from './pages/HomePage';
import Banner from './components/banner/Banner';
import MoviePage from './pages/MoviePage';
import MovieDetailsPage from './pages/MovieDetailsPage';

const App = () => {
   return (
      <>
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
                        <MoviePage />
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
            </Route>
         </Routes>
      </>
   );
};

export default App;
