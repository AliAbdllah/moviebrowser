import * as React from "react";
import { get, handleImageResponse } from "../utils";
import { IGenre, IMovie } from "../interfaces";
import GenreChip from "./GenreChip";
import Link from "next/link";
import { useMovieContext } from "@utils/context";
import { useRouter } from "next/router";

const MovieList = () => {
  const [movies, setMovies] = React.useState<IMovie[]>([]);
  const [pageIndex, setPageIndex] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [categories, setCategories] = React.useState<IGenre[]>([]);
  const { setSelectedMovie } = useMovieContext();
  const router = useRouter();
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await get("genre/movie/list");
        setCategories(response?.genres);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await get("movie/popular", `page=${pageIndex}`);
        setMovies([...movies, ...response.results]);
        pageIndex === 1 && setTotalPages(response?.total_pages);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [pageIndex]);

  const handleGetCategoryName = (id) => {
    const result = categories?.find((cat) => cat.id === id);
    return result ? result.name : "";
  };

  const hanldeChooseMovie = (movie: IMovie) => {
    setSelectedMovie(movie);
    router.push({
      pathname: `/movies/${movie.id}`,
    });
  };

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold py-4">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="bg-white p-4 rounded-md relative pb-12 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                hanldeChooseMovie(movie);
              }}
            >
              <img src={handleImageResponse(movie?.poster_path)} />
              <h3 className="text-2xl font-semibold pt-4">{movie?.title}</h3>
              <p className="text-[#BEBEBE] py-2">
                {movie?.release_date?.split("-")[0]}
              </p>
              <div className="flex flex-wrap w-full gap-2">
                {movie?.genre_ids.length > 0 &&
                  movie?.genre_ids?.map((genreId) => (
                    <div key={genreId}>
                      <GenreChip title={handleGetCategoryName(genreId)} />
                    </div>
                  ))}
              </div>
              <div className="absolute bottom-2">
                <span>⭐</span>
                <span className="font-bold pl-1">
                  {movie?.vote_average?.toFixed(1)}
                </span>
                <span className="text-[#BEBEBE] font-semibold pl-4">
                  {movie?.vote_count} votes
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full text-center py-10">
          {pageIndex < totalPages && (
            <button
              className="bg-[#BEBEBE] hover:bg-black text-white font-bold py-2 px-4 rounded"
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default MovieList;
