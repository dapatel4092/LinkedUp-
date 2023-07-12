import { gql } from '@apollo/client';


//Client side queries that will be used inside of our components

//Queries were tested in Apollo playground

export const GET_USER = gql`
  query getUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      bio
      socialMediaLinks {
        facebook
        twitter
        instagram
        snapchat
      }
      userGames {
        game {
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

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bio
      socialMediaLinks {
        facebook
        twitter
        instagram
        snapchat
      }
      userGames {
        game {
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

export const GET_GAMES = gql`
  query games {
    games {
      _id
      title
    }
  }
`;


export const GET_POSTS_BY_GAME = gql`
  query getPostsByGame($gameId: ID!) {
    postsByGame(gameId: $gameId) {
      _id
      content
      userId {
        _id
        username
      }
    }
  }
`;