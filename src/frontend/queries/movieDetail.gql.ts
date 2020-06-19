import { gql } from 'apollo-boost';

export const movieDetailQuery = gql`
  query movie($id: Int!) {
    movie(id: $id) {
      id
      title
      url
      path
      screencaps
      coverIndex
      volume {
        name
      }
      actresses {
        id
        name
        picture
      }
      metaData {
        durationSeconds
        sizeInMB
        minutes
        seconds
        quality
        format
        fps
      }
    }
  }
`;
