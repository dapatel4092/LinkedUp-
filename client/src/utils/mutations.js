import { gql } from '@apollo/client';

//Client side mutations

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($userId: ID!, $profileInput: ProfileInput!) {
    updateProfile(userId: $userId, profileInput: $profileInput) {
      _id
      bio
      socialMediaLinks {
        facebook
        twitter
        instagram
        snapchat
      }
    }
  }
`;

export const ADD_GAME_TO_PROFILE = gql`
  mutation AddGameToProfile($userId: ID!, $userGame: UserGameInput!) {
    addGameToProfile(userId: $userId, userGame: $userGame) {
      _id
      userGames {
        game {
          _id
          title
        }
        console
        gamingUsername
        competitive
        rank
      }
    }
  }
`;