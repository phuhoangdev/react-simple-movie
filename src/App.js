import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import MovieSearchApp from './components/MovieSearchApp';

const App = () => {
   return (
      <div>
         <Routes>
            <Route path="/" element={<Nav />}>
               <Route path="/" element={<MovieSearchApp />} />
               <Route path="/about" element={<div>About</div>} />
               <Route path="/movie/:movieId" element={<div>Detail movie</div>} />
            </Route>
            <Route path="*" element={<div>404</div>} />
         </Routes>
      </div>
   );
};

export default App;
