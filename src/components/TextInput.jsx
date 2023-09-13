import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  errorTextBox: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: theme.colors.error,
    borderRadius: 3,
    padding: 10,
    margin: 10,
    // flexShrink: 1,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput style={error ? styles.errorTextBox :textInputStyle} {...props} />;
};

export default TextInput;