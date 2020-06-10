import { gql } from 'apollo-boost';

export const settingsQuery = gql`
  query Settings {
    settings {
      language
      inferMovieTitle
      screencapPath
      volumes {
        name
        path
      }
    }
  }
`;

export const pathExistsQuery = gql`
  query PathExists($path: String!) {
    pathExists(path: $path)
  }
`;