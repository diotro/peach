import glob from 'glob';
import { movieFormats } from '@peach/domain';
import { Movie, Volume } from '@peach/database';
import { logScope } from '@peach/utils';
import * as path from 'path';
import { prisma } from '../prisma';
import { inferMovieTitle } from '../settings';

const log = logScope('scan-library');

const globP = (globExpr: string): Promise<string[]> =>
  new Promise((resolve, reject) =>
    glob(globExpr, (error, files) => {
      if (error) {
        return reject(error);
      }
      return resolve(files);
    }),
  );

const extensionsGlob = `*.@(${movieFormats.join('|')})`;

const existingMoviesByFilenames = (volumePath: string, filenames: string[]): Promise<Movie[]> =>
  prisma.movie.findMany({
    include: {
      metadata: true,
    },
    where: {
      AND: {
        path: {
          in: filenames,
        },
        volume: {
          path: volumePath,
        },
      },
    },
  });

const lastSegment = (p: string) => {
  const segments = p.split('/');
  return segments[segments.length - 1];
};

const titleFromFolder = (moviePath: string) => lastSegment(path.dirname(moviePath));
const titleFromFilename = (moviePath: string) => lastSegment(moviePath);

const createMovie = async (volume: Volume, moviePath: string) => {
  const inferMovieTitleType = await inferMovieTitle();
  const title =
    inferMovieTitleType === 'FILENAME'
      ? titleFromFilename(moviePath)
      : inferMovieTitleType === 'FOLDER'
      ? titleFromFolder(moviePath)
      : undefined;

  if (!title) {
    log.error(`Couldn't derive title from movie path ${moviePath}`);
    throw new Error('Error running task');
  }

  const movie = await prisma.movie.create({
    data: {
      title,
      path: moviePath,
      volume: {
        connect: {
          id: volume.id,
        },
      },
    },
  });

  log.info(`Created movie ${movie.title}`);

  return movie;
};

const trimVolumePath = (volumePath: string) => (filePath: string) =>
  filePath.replace(new RegExp(`^${volumePath}`), '');

export const scanVolume = (volume: Volume) =>
  globP(`${volume.path}/${extensionsGlob}`).then(async movieFiles => {
    log.debug(`Searching for movies: ${volume.path}/${extensionsGlob}`);
    const existingMovies = await existingMoviesByFilenames(volume.path, movieFiles);

    const moviesToCreate = movieFiles
      .map(trimVolumePath(volume.path))
      .filter(file => !existingMovies.map(m => m.path).includes(file));

    return Promise.all(moviesToCreate.map(movie => createMovie(volume, movie)));
  });
