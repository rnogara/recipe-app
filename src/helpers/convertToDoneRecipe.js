const convertToDoneRecipe = (recipe) => ({
  id: recipe.idDrink || recipe.idMeal,
  type: recipe.idDrink ? 'drink' : 'meal',
  nationality: recipe.strArea || '',
  category: recipe.strCategory,
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
  doneDate: (new Date()).toISOString(),
  tags: recipe.strTags ? recipe.strTags.split(',')
    .map((tag) => tag.replace(' ', '')) : [],
});

export default convertToDoneRecipe;
