import Svg, { G, Circle, Path } from "react-native-svg"
const IconArrowUp = ({ color, ...rest }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...rest}>
    <G fill="none" fillRule="evenodd">
      <Circle cx={20} cy={20} r={20} fill={color ?? "#303030"} />
      <Path stroke="#FFF" strokeWidth={2} d="m14 23 6-6 6 6" />
    </G>
  </Svg>
);
export default IconArrowUp;