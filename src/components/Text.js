import { Text as DefaultText } from 'react-native';

const Text = ({ style, ...rest }) => {
  return (
    <DefaultText
      style={[
        {
          color: style?.color ?? 'white',
          fontSize: style?.fontSize ?? 15,
          textAlign: style?.textAlign ?? 'center',
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default Text;