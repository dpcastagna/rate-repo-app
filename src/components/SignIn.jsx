import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';

import theme from '../theme';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  errorText: {
    margin: 10,
    color: theme.colors.error,
  },
  errorTextBox: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: theme.colors.error,
    borderRadius: 3,
    padding: 10,
    margin: 10,
    // flexShrink: 1,
  },
  textBox: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 3,
    padding: 10,
    margin: 10,
    // flexShrink: 1,
  },
  loginButton: {
    padding: 10,
    margin: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  loginText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be longer or equal to 4')
    .required('Username is required'),
  password: yup
    .string()
    .min(4, 'Password must be longer or equal to 4')
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {

  return (
    <View>
      <FormikTextInput style={styles.textBox} name="username" placeholder="Username" />
      <FormikTextInput style={styles.textBox} name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable style={styles.loginButton} onPress={onSubmit}>
        <Text style={styles.loginText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values;
    
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;