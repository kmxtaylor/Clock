import { Text as DefaultText } from 'react-native';

const Text = ({ style, ...rest }) => {
  // let fontFam;
  // switch (parseInt(style?.fontWeight)) { // set to accept either str or int
  //   case 400:
  //     fontFam = 'Roboto_400Regular';
  //     break;
  //   case 500:
  //     fontFam = 'Roboto_500Medium';
  //     break;
  //   case 700:
  //     fontFam = 'Roboto_700Bold';
  //     break;
  // }

  return (
    <DefaultText
      style={[
        {
          // fontFamily: fontFam ?? 'Roboto_400Regular',
          color: style?.color ?? 'white',
          fontSize: style?.fontSize ?? 16,
          textAlign: style?.textAlign ?? 'center',
        },
        style,
      ]}
      {...rest}
    />
  );
};

export default Text;