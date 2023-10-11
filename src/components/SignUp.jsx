import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';

import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useCreateUser';

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
  signUpButton: {
    padding: 10,
    margin: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  signUpText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be between 5 and 30 characters long')
    .max(30, 'Username must be between 5 and 30 characters long')
    .required('Username is required'),
    password: yup
    .string()
    .min(5, 'Password must be between 5 and 50 characters long')
    .max(50, 'Password must be between 5 and 50 characters long')
    .required('Password is required'),
    passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const SignUpForm = ({ onSubmit }) => {

  return (
    <View>
      <FormikTextInput style={styles.textBox} name="username" placeholder="Username" />
      <FormikTextInput style={styles.textBox} name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput style={styles.textBox} name="passwordConfirm" placeholder="Password confirmation" secureTextEntry={true} />
      <Pressable style={styles.signUpButton} onPress={onSubmit}>
        <Text style={styles.signUpText}>Create user</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const { username, password } = values;
    
    try {
      const { signUpData } = await signUp({ username, password });
      console.log(signUpData);
      const { signInData } = await signIn({ username, password });
      console.log(signInData);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;