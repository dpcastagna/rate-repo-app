import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import useCreateReview from '../hooks/useCreateReview';

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
  formButton: {
    padding: 10,
    margin: 10,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  formButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  }
});

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be a number between 0 and 100')
    .max(100, 'Rating must be a number between 0 and 100')
    .required('Rating is required'),
  text: yup
    .string()
    .optional(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  text: '',
};

const ReviewForm = ({ onSubmit }) => {

  return (
    <View>
      <FormikTextInput style={styles.textBox} name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput style={styles.textBox} name="repositoryName" placeholder="Repository name" />
      <FormikTextInput style={styles.textBox} name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.textBox} name="text" placeholder="Review" multiline />
      <Pressable style={styles.formButton} onPress={onSubmit}>
        <Text style={styles.formButtonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {

  return (
    <Formik 
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const Review = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async values => {
    const ownerName = values.ownerName;
    const repositoryName = values.repositoryName;
    const rating = Number(values.rating);
    const text = values.text;

    // console.log(ownerName, repositoryName, rating, text);
    
    try {
      const { data } = await createReview({ ownerName, repositoryName, rating, text });
      console.log(data);
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;