type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

type Actress = {
  __typename?: 'Actress';
  id: Scalars['Int'];
  name: Scalars['String'];
  aliases: Array<Scalars['String']>;
  haircolor?: Maybe<Haircolor>;
  eyecolor?: Maybe<Eyecolor>;
  ethnicity?: Maybe<Ethnicity>;
  dateOfBirth?: Maybe<Scalars['String']>;
  dateOfCareerstart?: Maybe<Scalars['String']>;
  dateOfRetirement?: Maybe<Scalars['String']>;
  dateOfDeath?: Maybe<Scalars['String']>;
  inBusiness?: Maybe<Scalars['Boolean']>;
  country?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  location?: Maybe<GeoLocation>;
  boobs?: Maybe<Boobs>;
  piercings?: Maybe<Scalars['String']>;
  tattoos?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  measurements?: Maybe<Measurements>;
  cupsize?: Maybe<Cupsize>;
  socialMediaLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
  officialWebsite?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  movies?: Maybe<Array<Movie>>;
};

type ActressCreateInput = {
  name: Scalars['String'];
};

type ActressFilter = {
  name?: Maybe<Scalars['String']>;
};

type Boobs = 'Natural' | 'Fake';

type Cupsize =
  | 'AA'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'DD'
  | 'DDD'
  | 'E'
  | 'F'
  | 'FF'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K';

type Ethnicity = 'Caucasian' | 'Asian' | 'Latina' | 'Ebony' | 'Native' | 'American' | 'Indian';

type Eyecolor = 'Green' | 'Blue' | 'Brown' | 'Hazel' | 'Grey' | 'Other';

type Format = 'mp4' | 'wmv';

type Genre = {
  __typename?: 'Genre';
  id: Scalars['Int'];
  name: Scalars['String'];
  category: GenreCategory;
  kinkiness: Scalars['Int'];
  validAsRoot: Scalars['Boolean'];
  linkableParents: Array<Genre>;
};

type GenreCategory =
  | 'Position'
  | 'Location'
  | 'Clothing'
  | 'Practice'
  | 'Film'
  | 'Feature'
  | 'BodyPart';

type GenreCreateInput = {
  name: Scalars['String'];
  category: GenreCategory;
  kinkiness: Scalars['Int'];
  validAsRoot: Scalars['Boolean'];
};

type GenreFilter = {
  name?: Maybe<Scalars['String']>;
  category?: Maybe<GenreCategory>;
};

type GeoLocation = {
  __typename?: 'GeoLocation';
  longitude: Scalars['Float'];
  latitude: Scalars['Float'];
};

type Haircolor = 'Blonde' | 'Brunette' | 'Black' | 'Red' | 'Auburn' | 'Other';

type InferMovieTitle = 'FOLDER' | 'FILENAME';

type Language = 'EN';

type Measurements = {
  __typename?: 'Measurements';
  bust: Scalars['Int'];
  waist: Scalars['Int'];
  hips: Scalars['Int'];
};

type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  actresses: Array<Actress>;
  metaData?: Maybe<MovieMetadata>;
  actors: Scalars['Int'];
  fresh: Scalars['Boolean'];
  volume?: Maybe<Volume>;
  screencaps: Array<Scalars['String']>;
  coverIndex: Scalars['Int'];
  path: Scalars['String'];
};

type MovieFromFileInput = {
  title: Scalars['String'];
  location: MovieLocation;
  actors?: Maybe<Scalars['Int']>;
};

type MovieListMovie = {
  __typename?: 'MovieListMovie';
  id: Scalars['Int'];
  createdAt: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  fresh: Scalars['Boolean'];
  screencaps: Array<Scalars['String']>;
  coverIndex: Scalars['Int'];
};

type MovieLocation = {
  volumeName: Scalars['String'];
  filePath: Scalars['String'];
};

type MovieMetadata = {
  __typename?: 'MovieMetadata';
  quality: Quality;
  format: Format;
  fps: Scalars['Int'];
  durationSeconds: Scalars['Int'];
  minutes: Scalars['Int'];
  seconds: Scalars['Int'];
  sizeInKB: Scalars['Int'];
  sizeInMB: Scalars['Int'];
};

type MovieUpdateInput = {
  cover?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

type Mutation = {
  __typename?: 'Mutation';
  addActressToMovie?: Maybe<Movie>;
  addLinkableParent?: Maybe<Genre>;
  cancelTask?: Maybe<Scalars['Boolean']>;
  createActress?: Maybe<Actress>;
  createGenre?: Maybe<Genre>;
  createMovieFromFile: Movie;
  deleteMovie?: Maybe<Movie>;
  removeActressFromMovie?: Maybe<Movie>;
  removeLinkableParent?: Maybe<Genre>;
  restartTask?: Maybe<Task>;
  saveVolumes: Array<Volume>;
  scanLibrary?: Maybe<Scalars['Boolean']>;
  scrapeActress?: Maybe<Scalars['Boolean']>;
  takeAllScreencaps?: Maybe<Scalars['Boolean']>;
  updateActressImagePath: Settings;
  updateInferMovieTitle: Settings;
  updateLanguage: Settings;
  updateMovie?: Maybe<Movie>;
  updateScreencapPath: Settings;
};

type MutationAddActressToMovieArgs = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type MutationAddLinkableParentArgs = {
  child: Scalars['Int'];
  parent: Scalars['Int'];
};

type MutationCancelTaskArgs = {
  taskId: Scalars['Int'];
};

type MutationCreateActressArgs = {
  actress: ActressCreateInput;
};

type MutationCreateGenreArgs = {
  genreInput: GenreCreateInput;
};

type MutationCreateMovieFromFileArgs = {
  input: MovieFromFileInput;
};

type MutationDeleteMovieArgs = {
  movieId: Scalars['Int'];
};

type MutationRemoveActressFromMovieArgs = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type MutationRemoveLinkableParentArgs = {
  child: Scalars['Int'];
  parent: Scalars['Int'];
};

type MutationRestartTaskArgs = {
  taskId: Scalars['Int'];
};

type MutationSaveVolumesArgs = {
  input: SaveVolumesInput;
};

type MutationScrapeActressArgs = {
  id: Scalars['Int'];
};

type MutationUpdateActressImagePathArgs = {
  path: Scalars['String'];
};

type MutationUpdateInferMovieTitleArgs = {
  inferMovieTitle?: Maybe<InferMovieTitle>;
};

type MutationUpdateLanguageArgs = {
  language?: Maybe<Language>;
};

type MutationUpdateMovieArgs = {
  movieId: Scalars['Int'];
  data: MovieUpdateInput;
};

type MutationUpdateScreencapPathArgs = {
  path: Scalars['String'];
};

type Quality = 'SD' | 'HD' | 'FullHD' | 'UHD';

type Query = {
  __typename?: 'Query';
  actress?: Maybe<Actress>;
  actresses: Array<Actress>;
  actressesCount: Scalars['Int'];
  genres: Array<Genre>;
  movie?: Maybe<Movie>;
  movieCount: Scalars['Int'];
  movies: Array<MovieListMovie>;
  pathExists?: Maybe<Scalars['Boolean']>;
  randomMovie: Movie;
  settings: Settings;
  setupStatus: SetupStatus;
  tasks: Array<Task>;
  volumes: Array<Volume>;
};

type QueryActressArgs = {
  id: Scalars['Int'];
};

type QueryActressesArgs = {
  filter?: Maybe<ActressFilter>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

type QueryActressesCountArgs = {
  filter?: Maybe<ActressFilter>;
};

type QueryGenresArgs = {
  filter?: Maybe<GenreFilter>;
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

type QueryMovieArgs = {
  id: Scalars['Int'];
};

type QueryMoviesArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

type QueryPathExistsArgs = {
  path: Scalars['String'];
};

type SaveVolumesInput = {
  volumes: Array<VolumeInput>;
};

type Settings = {
  __typename?: 'Settings';
  language: Language;
  volumes: Array<Volume>;
  inferMovieTitle: InferMovieTitle;
  actressImagePath?: Maybe<Scalars['String']>;
  screencapPath?: Maybe<Scalars['String']>;
};

type SetupStatus = 'Complete' | 'NoVolumes';

type Task = {
  __typename?: 'Task';
  id: Scalars['Int'];
  category: Scalars['String'];
  status: TaskStatus;
  parameters?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

type TaskStatus = 'RUNNING' | 'PENDING' | 'ERROR';

type Volume = {
  __typename?: 'Volume';
  name: Scalars['String'];
  path: Scalars['String'];
};

type VolumeInput = {
  name: Scalars['String'];
  path: Scalars['String'];
};

type CreateActressMutationVariables = {
  name: Scalars['String'];
};

type CreateActressMutation = {
  __typename?: 'Mutation';
  createActress?: Maybe<{ __typename?: 'Actress'; id: number; name: string }>;
};

type DeleteMovieMutationVariables = {
  movieId: Scalars['Int'];
};

type DeleteMovieMutation = {
  __typename?: 'Mutation';
  deleteMovie?: Maybe<{ __typename?: 'Movie'; id: number }>;
};

type SaveVolumesMutationVariables = {
  input: SaveVolumesInput;
};

type SaveVolumesMutation = {
  __typename?: 'Mutation';
  saveVolumes: Array<{ __typename?: 'Volume'; name: string; path: string }>;
};

type ScanLibraryMutationVariables = {};

type ScanLibraryMutation = { __typename?: 'Mutation'; scanLibrary?: Maybe<boolean> };

type TakeAllScreencapsMutationVariables = {};

type TakeAllScreencapsMutation = { __typename?: 'Mutation'; takeAllScreencaps?: Maybe<boolean> };

type RestartTaskMutationVariables = {
  taskId: Scalars['Int'];
};

type RestartTaskMutation = {
  __typename?: 'Mutation';
  restartTask?: Maybe<{ __typename?: 'Task'; id: number }>;
};

type CancelTaskMutationVariables = {
  taskId: Scalars['Int'];
};

type CancelTaskMutation = { __typename?: 'Mutation'; cancelTask?: Maybe<boolean> };

type UpdateCoverMutationVariables = {
  movieId: Scalars['Int'];
  cover: Scalars['Int'];
};

type UpdateCoverMutation = {
  __typename?: 'Mutation';
  updateMovie?: Maybe<{ __typename?: 'Movie'; coverIndex: number }>;
};

type UpdateTitleMutationVariables = {
  movieId: Scalars['Int'];
  title: Scalars['String'];
};

type UpdateTitleMutation = {
  __typename?: 'Mutation';
  updateMovie?: Maybe<{ __typename?: 'Movie'; title: string }>;
};

type AddActressToMovieMutationVariables = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type AddActressToMovieMutation = {
  __typename?: 'Mutation';
  addActressToMovie?: Maybe<{
    __typename?: 'Movie';
    actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
  }>;
};

type RemoveActressFromMovieMutationVariables = {
  movieId: Scalars['Int'];
  actressId: Scalars['Int'];
};

type RemoveActressFromMovieMutation = {
  __typename?: 'Mutation';
  removeActressFromMovie?: Maybe<{
    __typename?: 'Movie';
    actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
  }>;
};

type UpdateLanguageMutationVariables = {
  language?: Maybe<Language>;
};

type UpdateLanguageMutation = {
  __typename?: 'Mutation';
  updateLanguage: { __typename?: 'Settings'; language: Language };
};

type UpdateInferMovieTitleMutationVariables = {
  inferMovieTitle?: Maybe<InferMovieTitle>;
};

type UpdateInferMovieTitleMutation = {
  __typename?: 'Mutation';
  updateInferMovieTitle: { __typename?: 'Settings'; inferMovieTitle: InferMovieTitle };
};

type UpdateScreencapPathMutationVariables = {
  screencapPath: Scalars['String'];
};

type UpdateScreencapPathMutation = {
  __typename?: 'Mutation';
  updateScreencapPath: { __typename?: 'Settings'; screencapPath?: Maybe<string> };
};

type UpdateActressImagePathMutationVariables = {
  actressImagePath: Scalars['String'];
};

type UpdateActressImagePathMutation = {
  __typename?: 'Mutation';
  updateActressImagePath: { __typename?: 'Settings'; actressImagePath?: Maybe<string> };
};

type ActressQueryVariables = {
  id: Scalars['Int'];
};

type ActressQuery = {
  __typename?: 'Query';
  actress?: Maybe<{
    __typename?: 'Actress';
    id: number;
    name: string;
    picture?: Maybe<string>;
    aliases: Array<string>;
    haircolor?: Maybe<Haircolor>;
    eyecolor?: Maybe<Eyecolor>;
    ethnicity?: Maybe<Ethnicity>;
    dateOfBirth?: Maybe<string>;
    dateOfCareerstart?: Maybe<string>;
    dateOfRetirement?: Maybe<string>;
    dateOfDeath?: Maybe<string>;
    inBusiness?: Maybe<boolean>;
    country?: Maybe<string>;
    province?: Maybe<string>;
    city?: Maybe<string>;
    boobs?: Maybe<Boobs>;
    piercings?: Maybe<string>;
    tattoos?: Maybe<string>;
    height?: Maybe<number>;
    weight?: Maybe<number>;
    cupsize?: Maybe<Cupsize>;
    socialMediaLinks?: Maybe<Array<Maybe<string>>>;
    officialWebsite?: Maybe<string>;
    location?: Maybe<{ __typename?: 'GeoLocation'; latitude: number; longitude: number }>;
    measurements?: Maybe<{
      __typename?: 'Measurements';
      bust: number;
      hips: number;
      waist: number;
    }>;
    movies?: Maybe<
      Array<{ __typename?: 'Movie'; id: number; title: string; screencaps: Array<string> }>
    >;
  }>;
};

type ActressesListQueryVariables = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

type ActressesListQuery = {
  __typename?: 'Query';
  actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
};

type ActressesCountQueryVariables = {};

type ActressesCountQuery = { __typename?: 'Query'; actressesCount: number };

type FindActressQueryVariables = {
  name: Scalars['String'];
};

type FindActressQuery = {
  __typename?: 'Query';
  actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
};

type MovieQueryVariables = {
  id: Scalars['Int'];
};

type MovieQuery = {
  __typename?: 'Query';
  movie?: Maybe<{
    __typename?: 'Movie';
    id: number;
    title: string;
    url: string;
    path: string;
    screencaps: Array<string>;
    coverIndex: number;
    volume?: Maybe<{ __typename?: 'Volume'; name: string }>;
    actresses: Array<{ __typename?: 'Actress'; id: number; name: string; picture?: Maybe<string> }>;
    metaData?: Maybe<{
      __typename?: 'MovieMetadata';
      durationSeconds: number;
      sizeInMB: number;
      minutes: number;
      seconds: number;
      quality: Quality;
      format: Format;
      fps: number;
    }>;
  }>;
};

type MovieListQueryVariables = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};

type MovieListQuery = {
  __typename?: 'Query';
  movies: Array<{
    __typename?: 'MovieListMovie';
    id: number;
    title: string;
    fresh: boolean;
    screencaps: Array<string>;
    coverIndex: number;
  }>;
};

type MovieCountQueryVariables = {};

type MovieCountQuery = { __typename?: 'Query'; movieCount: number };

type RandomMovieQueryVariables = {};

type RandomMovieQuery = {
  __typename?: 'Query';
  randomMovie: {
    __typename?: 'Movie';
    id: number;
    title: string;
    screencaps: Array<string>;
    coverIndex: number;
  };
};

type SettingsQueryVariables = {};

type SettingsQuery = {
  __typename?: 'Query';
  settings: {
    __typename?: 'Settings';
    language: Language;
    inferMovieTitle: InferMovieTitle;
    actressImagePath?: Maybe<string>;
    screencapPath?: Maybe<string>;
    volumes: Array<{ __typename?: 'Volume'; name: string; path: string }>;
  };
};

type PathExistsQueryVariables = {
  path: Scalars['String'];
};

type PathExistsQuery = { __typename?: 'Query'; pathExists?: Maybe<boolean> };

type TasksQueryVariables = {};

type TasksQuery = {
  __typename?: 'Query';
  tasks: Array<{
    __typename?: 'Task';
    id: number;
    status: TaskStatus;
    statusMessage?: Maybe<string>;
    category: string;
    parameters?: Maybe<string>;
  }>;
};

type SetupStatusQueryVariables = {};

type SetupStatusQuery = { __typename?: 'Query'; setupStatus: SetupStatus };
