import { gql } from 'apollo-boost';

export const updateGenreMutation = gql`
  mutation UpdateGenre($genreId: Int!, $data: GenreUpdateInput!) {
    updateGenre(genreId: $genreId, data: $data) {
      id
    }
  }
`;

export const addSubgenreMutation = gql`
  mutation AddSubgenre($parentId: Int!, $childId: Int!) {
    addSubgenre(parent: $parentId, child: $childId) {
      id
      name
      category
      picture
    }
  }
`;

export const removeSubgenreMutation = gql`
  mutation RemoveSubgenre($parentId: Int!, $childId: Int!) {
    removeSubgenre(parent: $parentId, child: $childId) {
      id
    }
  }
`;
