import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(
      (result) => {
        setItems(result.data);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  const data = Object.values(items);

  const searchParameters = Object.keys(Object.assign({}, ...data));

  const searchData = (value) => {
    setSearchTerm(value);
    if (searchTerm !== "") {
      const filteredData = items.filter((item) =>
        searchParameters.some((parameter) =>
          item[parameter].toString().toLowerCase().includes(searchTerm)
        )
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(items);
    }
  };

  if (error) {
    return <div className='text-center h3'>Error: {error.message}</div>;
  } else {
    return (
      <div className='container'>
        <form className='w-50 me-auto mb-3'>
          <input
            type='search'
            className='form-control shadow-none'
            placeholder='Search'
            onChange={(e) => searchData(e.target.value)}
          />
        </form>
        {searchTerm.length > 0 &&
          filteredResults.map((item, index) => {
            return (
              <div className='container' key={index}>
                <p>{item.name}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Search;
