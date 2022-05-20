import { useEffect, useState } from "react";

import RecipesPage from "../../components/recipesPage"
import { useLocalRecipes } from "../../helpers/hooks"

const SavedRecipes = () => {
  const [ recipes ] = useLocalRecipes()
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  
  return (
    <RecipesPage header="Saved recipes" path="/recipes/saved" description="" recipes={recipes} />
  )
}

export default SavedRecipes
