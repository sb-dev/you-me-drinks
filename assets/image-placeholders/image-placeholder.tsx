import AltMilkPlaceholder from "./alt-milk-placeholder";
import CoffeePlaceholder from "./coffee-placeholder";
import InfusionPlaceholder from "./infusion-placeholder";
import MocktailPlaceholder from "./mocktail-placeholder";
import ShotPlaceholder from "./shot-placeholder";
import SmoothiePlaceholder from "./smoothie-placeholder";
import SodaPlaceholder from "./soda-placeholder";

const ImagePlaceholder = ({ type, width, height }: any) => {
  switch(type) {
    case "shot":
      return (<ShotPlaceholder width={width} height={height} />)
    case "smoothie":
      return (<SmoothiePlaceholder width={width} height={height} />)
    case "infusion":
      return (<InfusionPlaceholder width={width} height={height} />)
    case "coffee":
      return (<CoffeePlaceholder width={width} height={height} />)
    case "fermented drink":
      return (<SodaPlaceholder width={width} height={height} />)
    case "alternative milk":
      return (<AltMilkPlaceholder width={width} height={height} />)
    default:
      return (<MocktailPlaceholder width={width} height={height} />)
  }
}

export default ImagePlaceholder
