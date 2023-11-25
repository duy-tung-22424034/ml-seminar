import React, { useState, useEffect } from "react";

const MovieSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [movies, setMovies] = useState([]); // State for the current list of movies

    useEffect(() => {
        // Function to fetch current movies with descriptions
        const fetchMovies = async () => {
            try {
                const response = await fetch(`http://localhost:5000/movies`);
                const data = await response.json();
                // Convert the object to an array of movie objects
                const moviesArray = Object.entries(data).map(([title, description]) => ({
                    title,
                    description,
                }));
                setMovies(moviesArray);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            console.log(data);
            setResults(data); // Assuming the response is an array of search results
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Function to determine which list to display
    const getListToDisplay = () => {
        return query.length > 0 ? results : movies;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Movie Semantic Search</h1>
            <form onSubmit={handleSearch} className="flex flex-col items-center w-full max-w-md px-4">
                <div className="flex w-full mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter a search query..."
                        className="flex-1 p-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-md transition duration-300"
                    >
                        Search
                    </button>
                </div>
            </form>

            <div className="w-full max-w-md px-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                    {query.length > 0 ? "Search Results:" : "Current Movies:"}
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
