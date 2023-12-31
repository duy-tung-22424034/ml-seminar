import React, { useState, useEffect } from "react";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [movies, setMovies] = useState([]); 
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:5001/movies`);
                const data = await response.json();
                const moviesArray = Object.entries(data).map(([title, description]) => ({
                    title,
                    description,
                }));
                console.log('moviesArray', moviesArray)
                setMovies(moviesArray);
                setResults(moviesArray)
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies()


    }, []);

    const getListToDisplay = () => {
        return results;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchPerformed(true); // Set searchPerformed to true when search is initiated
        try {
            const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data.length && query.length ? data : movies);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const changeSearchStr = (str) => {
        setQuery(str);
        !str && setResults(movies);
        !str && setSearchPerformed(false);
    }

    return (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-11">
            <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl text-center">Movie Semantic Search</h1>
            <form onSubmit={handleSearch} className="flex flex-col items-center w-full max-w-md px-4 max-w-max max-w-screen-2xl mt-10">
                <div className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300 w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => changeSearchStr(e.target.value)}
                        placeholder="Enter a search query..."
                        className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                    />
                    <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all"
                    >
                        <div className="flex items-center transition-all opacity-1">
                        <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                            Search
                        </span>
                        </div>
                    </button>
                </div>
            </form>

            <div className="w-fullx px-4 m-auto mt-16 max-w-max w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {searchPerformed ? "Search Results:" : "Current Movies:"}
                </h2>
                <ul className="bg-white shadow rounded divide-y divide-gray-200">
                    {getListToDisplay().map((movie, index) => (
                         <li key={index} className="p-3 hover:bg-gray-50 cursor-pointer transition duration-300">
                         {typeof movie === 'object' && movie.title ? (
                             <div>
                                 <span className="font-bold">{movie.title}</span>
                                 {movie.description && <p className="text-gray-600">{movie.description}</p>}
                             </div>
                         ) : (
                             <span className="font-bold">{movie}</span>
                         )}
                     </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MovieSearch;
