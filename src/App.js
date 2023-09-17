import React from 'react';
import MoviesList from './Components/MoviesList';
import './App.css';
import { useState ,useEffect,useCallback} from 'react';
import AddMovie from './Components/AddMovie';

function App() {
  const [movies,setMovies]=useState([]) 
  const [isLoading , setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  
  const fetchMoviesHandler=useCallback(async ()=>{
    setIsLoading(true);
    setError(null);
    try{
      const response=await fetch('https://swapi.dev/api/films');
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data=await response.json();
      const transFormedData=data.results.map((moviesData)=>{
        return{
          id:moviesData.episode_id,
          title:moviesData.title,
          openingText:moviesData.opening_crawl,
          releaseDate:moviesData.release_date,
        }
      })
      setMovies(transFormedData);
    }
    catch(error){
      setError(error.message);
     
    }
    setIsLoading(false);
  },[]);
    
  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  function addMoviesHandler(movie){
    console.log(movie)
  }
    
  let content=<p>No Movies Found</p>

  if(movies.length>0){
    content=<MoviesList movies={movies} />
  }

  if(error){
    content=<p>{error}</p>
  }

  if(isLoading){
    content=<p>Found no movies..</p>
  }

  return (
    <React.Fragment>
      <sectio>
        <AddMovie onAddMovie={addMoviesHandler}/>
      </sectio>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
};

export default App;


