import React, { useEffect, useState } from "react";
import Recipe from "./recipe";
import ReactPaginate from "react-paginate";
import axios from 'axios';
function Home() {

  //states
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQquery] = useState("chicken");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  
  
  //consts for getting current page
  const recipesPerPage = 3;
  const pagesVisited = pageNumber * recipesPerPage;
  const pageCount = Math.ceil(recipes.length / recipesPerPage);
  

  //get recipes from API
  useEffect(() => {
  
    getRecipes();
    
  }, [query]);

  const getRecipes = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_REPCIPE_APP_ID}&app_key=${process.env.REACT_APP_REPCIPE_APP_KEY}`
    );
    
    setRecipes(response.data.hits);
    setPageNumber(0);
    setLoading(false);
  };
  
  const displayRecipes = recipes
  .slice(pagesVisited, pagesVisited + recipesPerPage)
  .map((recipe) => {
   
      return (
       <Recipe
      key={recipe.recipe.label}
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredientLines}
    />
    );
  
  });
  
  

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    window.scrollTo(0, 0);
    
  };

  const getSearch = async(e) => {
    e.preventDefault();
    setQquery(search);
    
  };
  return (
    <div className='page_con'>
    <form onSubmit={getSearch} className='search-form'>
      <input
        type='text'
        className='search-bar'
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className='search-button' type='submit'>
      <i className="fa fa-search"></i>
      </button>
    </form>
    {loading ? <p>Loading...</p> :
    <>
    
    {displayRecipes.length > 0? displayRecipes : <p> No Search Found</p>}
    {displayRecipes.length > 0 &&
    <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        activeClassName={"paginationActive"}
        disabledClassName={"paginationDisabled"}
        
      />
    }
      </>
  }
  </div>
  )
}

export default Home
