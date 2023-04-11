export const getDetails = (detailed, pathname) => {
  const detail = detailed || { meals: [{}], drinks: [{}] };
  const ingredientsRange = 20;
  const ing = 'strIngredient';
  const meas = 'strMeasure';
  const recipeData = pathname.includes('meal') ? { ...detail.meals[0] }
    : { ...detail.drinks[0] };
  const payload = {
    area: recipeData.strArea || '',
    id: recipeData.idDrink || recipeData.idMeal,
    title: recipeData.strMeal || recipeData.strDrink,
    thumbnail: recipeData.strMealThumb || recipeData.strDrinkThumb,
    instructions: recipeData.strInstructions,
    category: pathname.includes('meals') ? recipeData.strCategory
      : recipeData.strCategory,
    alcoholicOrNot: recipeData.strAlcoholic || '',
    ingredients: [],
    measurements: [],
    video: recipeData.strYoutube || 'false',
  };
  for (let i = 1; i <= ingredientsRange; i += 1) {
    const ingRef = recipeData[ing + i];
    if (ingRef !== null && ingRef !== undefined && ingRef !== '') {
      payload.ingredients.push(recipeData[ing + i]);
      payload.measurements.push(recipeData[meas + i]);
    }
  }
  return payload;
};
