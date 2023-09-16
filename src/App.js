import React from 'react';
import MoviesList from './Components/MoviesList';
import './App.css';
import { useState } from 'react';

function App() {
  const [movies,setMovies]=useState([]) 
  const fetchMoviesHandler=()=>{
    fetch('https://swapi.dev/api/films').then(response=>{
      return response.json();
    }).then(data=>{
      const transFormedData=data.result.map(moviesData=>{
        return{
          id:moviesData.episode_id,
          title:moviesData.title,
          openingText:moviesData.opening_crawl,
          releaseDate:moviesData.release_date,
        }
      })
      setMovies(transFormedData);
    })
  }
  
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
};

export default App;