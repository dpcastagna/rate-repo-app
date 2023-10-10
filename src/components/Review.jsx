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
  reposityOwner: yup
    .string()
    .required('Repository owner name is required'),
  reposityName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be a number between 0 and 100')
    .max(100, 'Rating must be a number between 0 and 100')
    .required('Rating is required'),
  review: yup
    .string()
    .optional(),
});

const initialValues = {
  reposityOwner: '',
  reposityName: '',
  rating: '',
  review: '',
};

const ReviewForm = ({ onSubmit }) => {

  return (
    <View>
      <FormikTextInput style={styles.textBox} name="reposityOwner" placeholder="Reposity owner name" />
      <FormikTextInput style={styles.textBox} name="reposityName" placeholder="Reposity name" />
      <FormikTextInput style={styles.textBox} name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.textBox} name="review" placeholder="Review" multiline />
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
    const repositoryOwner = values.repositoryOwner;
    const repositoryName = values.repositoryName;
    const rating = Number(values.rating);
    const review = values.review;
    
    try {
      const { data } = await createReview({ repositoryOwner, repositoryName, rating, review });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;