import { MovieGetPayload, MovieMetadata } from '@peach/database';
import { Format, Movie, Quality } from '../generated/types';

const qualityMap: { [key: string]: Quality } = {
  SD: Quality.Sd,
  HD: Quality.Hd,
  FULLHD: Quality.FullHd,
  UHD: Quality.Uhd,
};

const formatMap: { [key: string]: Format } = {
  MP4: Format.Mp4,
  WMV: Format.Wmv,
};

type MovieWithMetadata = MovieGetPayload<{
  include: { metadata: true };
}>;

const transformMetadata = (metadata: MovieMetadata): Movie['metaData'] => ({
  quality: qualityMap[metadata.quality || 'SD'],
  format: formatMap[metadata.format || 'MP4'],
  fps: metadata.fps,
  minutes: metadata.minutes,
  seconds: metadata.seconds,
  size: metadata.size,
});

export const transformMovie = (movie: MovieWithMetadata): Movie => ({
  id: movie.id,
  createdAt: movie.createdAt.toString(),
  title: movie.title,
  metaData: movie.metadata ? transformMetadata(movie.metadata) : undefined,
  actors: movie.actors,
  coverImage: '',
});