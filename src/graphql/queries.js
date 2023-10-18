import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
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
    }
  }
`;

export const GET_SINGLE_REPOSITORY = gql`
  query Repository ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      ownerAvatarUrl
      description
      language
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const FILTER_REPOSITORIES = gql`
  query FilterRepositories($searchKeyword: String){
    repositories(searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          description
          language
        }
      }
    }
  }
`;