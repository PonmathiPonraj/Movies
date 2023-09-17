// import React from 'react';
// import MoviesList from './Components/MoviesList';
// import './App.css';
// import { useState } from 'react';

// function App() {
//   const [movies,setMovies]=useState([]) 
//   const [isLoading , setIsLoading]=useState(false);

//   async function fetchMoviesHandler(){
//     const response=await fetch('https://swapi.dev/api/films')

//     setIsLoading(true);

//     const data=await response.json();
//     const transFormedData=data.results.map((moviesData)=>{
//       return{
//         id:moviesData.episode_id,
//         title:moviesData.title,
//         openingText:moviesData.opening_crawl,
//         releaseDate:moviesData.release_date,
//       };
//     })
//     setMovies(transFormedData);
//     setIsLoading(false);
//   };

//   return (
//     <React.Fragment>
//       <section>
//         <button onClick={fetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section>
//         {!isLoading && movies.length>0 && <MoviesList movies={movies} />} 
//         {!isLoading && movies.length===0 && <p>No Movies found</p>}
//         {isLoading && <p>Loading...</p>}
//       </section>
//     </React.Fragment>
//   );
// };

// export default App;


import React, { useState } from 'react';
import MoviesList from './Components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const fetchMoviesHandler = async () => {
    setError(null);
    setIsLoading(true); // Set loading state before initiating the fetch

    try {
      const response = await fetch('https://swapi.dev/api/film');
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const transFormedData = data.results.map((moviesData) => ({
        id: moviesData.episode_id,
        title: moviesData.title,
        openingText: moviesData.opening_crawl,
        releaseDate: moviesData.release_date,
      }));
      setMovies(transFormedData);
    } 
    catch (error) {
      setError('Something went wrong... Retrying');
      setRetrying(true); // Set retrying to true if an error occurs
    } 
    finally {
      setIsLoading(false); // Set loading state to false after fetch completion
    }
  };

  const retryHandler = () => {
    setRetrying(true);
    fetchMoviesHandler(); // Start the retry immediately
  };

  const cancelRetryHandler = () => {
    setRetrying(false);
    setIsLoading(false);
  };

  let content = <p>No Movies Found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = (
      <div>
        <p>{error}</p>
        <button onClick={retryHandler} value={retrying}>Retry</button>
        <button onClick={cancelRetryHandler}>Cancel</button>
      </div>
    );
  }

  if (isLoading) {
    content = <p>Loading....</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
      </React.Fragment>
  );
};

export default App;