import Image from "next/image";
import Link from 'next/link';
import SmoothiePlaceholder from "../public/smoothie-placeholder.png";
import SodaPlaceholder from "../public/soda-placeholder.png";

const RecipeCard = ({recipe}: any) => {
  const imagePlaceholder = (recipe: any) => {
    if(recipe.type === "smoothie") {
      return SmoothiePlaceholder
    } else {
      return SodaPlaceholder
    }
  }
  
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <a className="flex flex-col">
        <Image src={imagePlaceholder(recipe)} alt="placeholder" />
        <div className="p-4 flex-col space-y-2">
          <span className="flex text-sm uppercase text-[#387F90]">
            {recipe.publicationType}
          </span>
          <span className="flex text-xl text-[#333333] leading-6 group-hover:underline decoration-[#58B4C3] decoration-[3px] capitalize">
            {recipe.title}
          </span>
          <span className="flex text-sm text-[#333333]">
            By {recipe.author.name}
          </span>
        </div>
      </a>
    </Link>
  )
}

export default RecipeCard;
