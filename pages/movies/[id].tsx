import GenreChip from "@components/GenreChip";
import { IGenre } from "@interfaces";
import { get, handleImageResponse } from "@utils";
import { useMovieContext } from "@utils/context";
import { useEffect, useState } from "react";

const MoviePage = () => {
  const { selectedMovie } = useMovieContext();
  const [categories, setCategories] = useState<IGenre[]>([]);
  useEffect(() => {
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

  const handleGetCategoryName = (id) => {
    const result = categories?.find((cat) => cat.id === id);
    return result ? result.name : "";
  };

  return (
    <div className="bg-[#F5F5FA] w-screen h-screen py-12">
      <div className="bg-white p-4 rounded-md relative  mx-auto lg:w-1/2 md:h-[550px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 ">
          <div>
            <img
              src={handleImageResponse(selectedMovie?.poster_path)}
              className="h-[500px] mx-auto"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold pb-4">
              {selectedMovie?.title}
            </h3>
            <p className="py-4 text-xl">
              {selectedMovie?.release_date?.split("-")[0]}
            </p>

            <p className="py-4 text-xl">
              Release Date:{" "}
              {new Date(selectedMovie?.release_date).toLocaleDateString(
                "en-GB",
              )}
            </p>
            <div className="flex flex-wrap w-full gap-2">
              {selectedMovie?.genre_ids.length > 0 &&
                selectedMovie?.genre_ids?.map((genreId) => (
                  <div key={genreId}>
                    <GenreChip title={handleGetCategoryName(genreId)} />
                  </div>
                ))}
            </div>
            <div className="py-6">
              <span>⭐</span>
              <span className="font-bold pl-1 text-xl">
                {selectedMovie?.vote_average?.toFixed(1)}
              </span>{" "}
              <span>/10</span>
              <span className="text-[#BEBEBE] font-semibold pl-4">
                {selectedMovie?.vote_count} votes
              </span>
            </div>
            <p className="py-6 pr-2 font-medium">{selectedMovie?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
