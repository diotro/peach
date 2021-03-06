import { gql } from 'apollo-boost';

export const updateCoverMutation = gql`
  mutation UpdateCover($movieId: Int!, $cover: Int!) {
    updateMovie(movieId: $movieId, data: { cover: $cover }) {
      coverIndex
    }
  }
`;

export const updateTitleMutation = gql`
  mutation UpdateTitle($movieId: Int!, $title: String!) {
    updateMovie(movieId: $movieId, data: { title: $title }) {
      title
    }
  }
`;

export const addActressToMovieMutation = gql`
  mutation AddActressToMovie($movieId: Int!, $actressId: Int!) {
    addActressToMovie(movieId: $movieId, actressId: $actressId) {
      actresses {
        id
        name
        picture
      }
    }
  }
`;

export const removeActressFromMovieMutation = gql`
  mutation RemoveActressFromMovie($movieId: Int!, $actressId: Int!) {
    removeActressFromMovie(movieId: $movieId, actressId: $actressId) {
      actresses {
        id
        name
        picture
      }
    }
  }
`;
