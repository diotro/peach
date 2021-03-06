import { FunctionalComponent, h } from 'preact';
import { useForm } from 'react-hook-form';
import { useEffect } from 'preact/hooks';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { Screencap, ScreencapStrip } from '../../../components/compositions/screencapStrip';
import { updateCoverMutation } from '../../mutations/updateMovie.gql';
import { i } from '../../i18n/i18n';

export type ScreencapStripFormProps = {
  movie: Pick<Movie, 'id' | 'screencaps' | 'coverIndex'>;
};

type ScreencapFormData = {
  cover: string;
};

export const ScreencapStripForm: FunctionalComponent<ScreencapStripFormProps> = ({ movie }) => {
  const { reset, formState, watch, getValues, register, handleSubmit } = useForm<ScreencapFormData>(
    {
      defaultValues: {
        cover: movie.coverIndex.toString(),
      },
    },
  );

  const [saveCover] = useMutation<UpdateCoverMutation, UpdateCoverMutationVariables>(
    updateCoverMutation,
  );

  const onSubmit = (data: ScreencapFormData) => {
    if (!formState.dirty) {
      return;
    }

    saveCover({
      variables: {
        movieId: movie.id,
        cover: parseInt(data.cover, 10),
      },
    }).then(() => {
      toast.success(i('COVER_FORM_SUCCESS'));
      reset(data);
    });
  };
  const watchCover = watch('cover');

  useEffect(() => {
    handleSubmit(onSubmit)();
  }, [watchCover]);

  return (
    <ScreencapStrip>
      {movie.screencaps.map((s, j) => (
        <Screencap
          name="cover"
          value={j}
          url={s}
          ref={register}
          active={getValues().cover === j.toString()}
        />
      ))}
    </ScreencapStrip>
  );
};
