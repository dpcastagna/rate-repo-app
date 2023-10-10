import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATEREVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      user {
        id
        username
        createdAt
        reviews {
          totalCount
          pageInfo {
            hasPreviousPage
            hasNextPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              userId
              repositoryId
              rating
              createdAt
              text
            }
          }
        }
        reviewCount
      }
      repository {
        id
        ownerName
        name
        createdAt
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        watchersCount
        forksCount
        openIssuesCount
        url
        ownerAvatarUrl
        description
        language
        userHasReviewed
      }
      userId
      repositoryId
      rating
      createdAt
      text
    }
  }
`;