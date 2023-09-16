import React from 'react';
import MoviesList from './Components/MoviesList';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies,setMovies]=useState([]) 
  const [isLoading , setIsLoading]=useState(false);

  async function fetchMoviesHandler(){
    const response=await fetch('https://swapi.dev/api/films')

    setIsLoading(true);

    const data=await response.json();
    const transFormedData=data.results.map((moviesData)=>{
      return{
        id:moviesData.episode_id,
        title:moviesData.title,
        openingText:moviesData.opening_crawl,
        releaseDate:moviesData.release_date,
      };
    })
    setMovies(transFormedData);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />} 
        {!isLoading && movies.length===0 && <p>No Movies found</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
};

export default App;