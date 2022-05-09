import ImagePlaceholder from "../assets/image-placeholders/image-placeholder";
import Link from 'next/link';

const RecipeCard = ({recipe}: any) => (
  <Link href={`/recipes/${recipe.slug}`}>
    <a className="flex flex-col">
      <ImagePlaceholder type={recipe.type} width="100%" height="100%"/>
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

export default RecipeCard;
