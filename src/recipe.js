import React from "react";


const Recipe = ({ title, calories, image, ingredients }) => {
  return (
    <div className="recipes">
     
     <div className="right">
       <div className="header">
       <img src={image} alt="" />
       <div className="title">
         <h1>{title}</h1>
         <p className="calorie">Calories: {calories}</p>
       </div>
       
       </div>
       <div className="direction_con">
      
     {ingredients.map((item) => (
           <p>
             {item}
           </p>
        ))}
     </div>
     </div>
     
    </div>
  );
};

export default Recipe;
