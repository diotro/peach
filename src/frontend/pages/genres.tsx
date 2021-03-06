import { Fragment, FunctionalComponent, h } from 'preact';
import { useQuery } from '@apollo/react-hooks';
import { Flex, GenreClip, GenreClipList, Headline2, Loading } from '../../components';
import { BasePage } from './basePage';
import { genresCountQuery, genresListQuery } from '../queries/genreList.gql';
import { usePagination } from '../utils/pagination';

import { genreDetailRoute } from '../utils/route';
import { CreateGenreForm } from '../components/genreList/createGenreForm';
import { HeadBar } from '../../components/components/headBar';
import { Text } from '../../components/components/text';
import { genreCategories } from '../../domain/genre/fixtures';

const pageLength = 48;

export const GenresPage: FunctionalComponent = () => {
  const count = useQuery<GenresCountQuery>(genresCountQuery);

  if (count.loading || count.error || !count.data) {
    return <Loading color="white" />;
  }

  const { limit, skip } = usePagination({
    pageLength: count.data.genresCount,
    maxItems: count.data.genresCount,
  });

  const { refetch, loading, data } = useQuery<GenresListQuery, GenresListQueryVariables>(
    genresListQuery,
    {
      variables: {
        limit,
        skip,
      },
    },
  );

  return (
    <BasePage>
      {loading ? (
        <Flex justify="center">
          <Loading color="white" />
        </Flex>
      ) : (
        <Fragment>
          <HeadBar headline="Genres" />
          {genreCategories.map(c => (
            <Fragment>
              <Headline2>{c}</Headline2>
              <GenreClipList appearance="large">
                {data?.genres
                  .filter(g => g.category === c)
                  .map(g => (
                    <GenreClip
                      descriptionSlot={<Text size="S">{g.name}</Text>}
                      genre={g}
                      shadow
                      url={genreDetailRoute(g.id)}
                    />
                  ))}
              </GenreClipList>
            </Fragment>
          ))}
          <CreateGenreForm onSubmit={refetch} />
        </Fragment>
      )}
    </BasePage>
  );
};
