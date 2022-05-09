import AltMilkIcon from "./alt-milk-icon";
import BlenderIcon from "./blender-icon";
import CoffeeIcon from "./coffee-icon";
import FermentedDrinkIcon from "./fermented-drink-icon";
import InfusionIcon from "./infusion-icon";
import MocktailIcon from "./mocktail-icon";
import ShotIcon from "./shot-icon";

const MethodIcon = ({ type, width, height }: any) => {
  switch(type) {
    case "shot":
      return (<ShotIcon width={width} height={height} />)
    case "smoothie":
      return (<BlenderIcon width={width} height={height} />)
    case "infusion":
      return (<InfusionIcon width={width} height={height} />)
    case "coffee":
      return (<CoffeeIcon width={width} height={height} />)
    case "fermented drink":
      return (<FermentedDrinkIcon width={width} height={height} />)
    case "alternative milk":
      return (<AltMilkIcon width={width} height={height} />)
    default:
      return (<MocktailIcon width={width} height={height} />)
  }
}

export default MethodIcon
