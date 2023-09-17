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
      const response=await fetch('https://react-http-2fdf7-default-rtdb.firebaseio.com/movies.json');
      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const data=await response.json();
      const loadingMovies=[];

      for(const key in data){
        loadingMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }

      setMovies(loadingMovies);
    }

    catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  },[]);
    
  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);

  async function addMoviesHandler(movie){
    const response=await fetch(`https://react-http-2fdf7-default-rtdb.firebaseio.com/movies.json` , {
      method: 'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const  data=await response.json();
    console.log(data);
  }

  async function deleteMovieHandler(movieId) {
    // Send a DELETE request to remove the movie from the database
    await fetch(`https://react-http-94ff9-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
      method: 'DELETE',
    });

    // Update the UI by removing the deleted movie from the state
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
  }


 let content=<p>No Movies Found</p>

 if(movies.length>0){
  content = <MoviesList movies={movies} onDeleteMovie={deleteMovieHandler} />;
 }
 if(error){
  content=<p>{error}</p>
 }
 if(isLoading){
  content=<p>Loading....</p>
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


