import React, { useState, useEffect } from "react";
import Unsplash, { toJson } from "unsplash-js";
import Loading from "./components/Loading/";
import Photos from "./Photos";
import PaginationBar from "./PaginationBar";

const unsplash = new Unsplash({
  accessKey: "8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b",
});

const itemsPerPage = 3;

export default function SearchPhotos() {

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);
  const [filteredPics, setFilteredPics] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (pics) {
      setTags([]);
      const tags = pics.map((pic) => {
        return pic.tags;
      });
      if (tags) {
        const titles = tags.map((tag) => {
          return tag.map((tg) => {
            return tg.title;
          });
        });
        if (titles) {
          titles.forEach((title) => {
            title.forEach((tt) => {
                setTags(tags => [...tags, tt]);
            });
          });
        }
      }
    }
  }, [pics]);

  useEffect(() => {
    const uniqueTags = tags.filter(function(elem, pos) {
        return tags.indexOf(elem) === pos;
    });

    setFilters(uniqueTags);
  }, [tags]);

  const handleNextPageCall = () => {
    const nextEndIndex = (currentPage + 1) * itemsPerPage;
    setCurrentPage(currentPage + 1);

    if (pics.length < nextEndIndex) {
      searchPhotos();
    }
  };

  const handlePrevPageCall = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const searchPhotos = async () => {
    setIsLoading(true);
    setFilteredPics([]);

    unsplash.search
      .photos(query)
      .then(toJson)
      .then((json) => {
        setIsLoading(false);
        setPics(json.results);
      });
  };

  const handleChangeFilter = (e) => {
    if (e.target.value !== "") {
      const tag = e.target.value;
      const newPics = pics.filter((pic) => { return pic.tags.find((el) => el.title === tag) });
      
      setFilteredPics(newPics);
    }
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * itemsPerPage - itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const srcData = filteredPics.length ? filteredPics : pics;

    return srcData.slice(startIndex, endIndex);
  };
  
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <form className="form" onSubmit={searchPhotos}>
            <button type="submit" className="button">
              Search
            </button>
            <input
              type="text"
              name="query"
              className="input"
              placeholder={"search photos"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {filters &&
              <>
                <label>{" "}</label>
                <select onChange={handleChangeFilter}>
                  <option value="default" disabled>
                    Filter by tags...
                  </option>
                  {filters.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </>
            }
          
          </form>
          <Photos data={getPaginatedData()} />
          <PaginationBar
            handlePrevPageCall={handlePrevPageCall}
            currentPage={currentPage}
            handleNextPageCall={handleNextPageCall}
          />
        </>
      )}
    </>
  );
}
