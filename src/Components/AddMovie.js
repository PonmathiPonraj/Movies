import { useRef } from 'react';
import classes from './AddMovie.module.css';

const AddMovie = (props) => {
    const releaseDateRef = useRef();
    const titleRef = useRef(null);
    const openingTextRef = useRef(null);

    function submitHandler(event){
        event.preventDefault();

        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value,
        };
        props.onAddMovie(movie);
    }

    return(
        <form onSubmit={submitHandler} className={classes.addMovieForm}>
            <div>
                <label htmlFor="title" className={classes.label}>
                    Title
                </label>
                <input type="text" id="title" ref={titleRef} />
            </div>
            <br />
            <div>
                <label htmlFor="opening-text" className={classes.label}>
                    Opening Text
                </label>
                <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
            </div>
            <br />
            <div>
                <label htmlFor="date" className={classes.label}>
                    Release Date
                </label>
                <input type="text" id="date" ref={releaseDateRef} />
            </div>
            <br />
            <button className={classes.addMoviesButton}>Add Movies</button>
        </form>
    );
};

export default AddMovie;