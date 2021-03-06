import { gql } from 'apollo-server';

export const typeDef = gql`
  enum Haircolor {
    Blonde
    Brunette
    Black
    Red
    Auburn
    Other
  }

  enum Eyecolor {
    Green
    Blue
    Brown
    Hazel
    Grey
    Other
  }

  enum Ethnicity {
    Caucasian
    Asian
    Latina
    Ebony
    NativeAmerican
    Indian
  }

  enum Boobs {
    Natural
    Fake
  }

  enum Cupsize {
    AA
    A
    B
    C
    D
    DD
    DDD
    E
    F
    FF
    G
    H
    I
    J
    K
  }

  type Measurements {
    bust: Int!
    waist: Int!
    hips: Int!
  }

  type Actress {
    id: Int!
    name: String!
    aliases: [String!]!

    haircolor: Haircolor
    eyecolor: Eyecolor
    ethnicity: Ethnicity

    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String

    inBusiness: Boolean

    country: String
    province: String
    city: String
    location: GeoLocation

    boobs: Boobs

    piercings: String
    tattoos: String

    height: Int
    weight: Int
    measurements: Measurements
    cupsize: Cupsize

    socialMediaLinks: [String]
    officialWebsite: String

    picture: String
    movies: [Movie!]
  }

  input ActressCreateInput {
    name: String!
  }

  input ActressUpdateInput {
    name: String
    dateOfBirth: String
    dateOfCareerstart: String
    dateOfRetirement: String
    dateOfDeath: String
    haircolor: Haircolor
    eyecolor: Eyecolor
    ethnicity: Ethnicity
    height: Int
    weight: Int
    measurements: MeasurementsInput
    cupsize: Cupsize
    boobs: Boobs
    tattoos: String
    piercings: String
  }

  input MeasurementsInput {
    bust: Int!
    waist: Int!
    hips: Int!
  }

  input ActressFilter {
    name: String
  }

  extend type Query {
    actress(id: Int!): Actress
    actresses(filter: ActressFilter, limit: Int, skip: Int): [Actress!]!
    actressesCount(filter: ActressFilter): Int!
  }

  extend type Mutation {
    createActress(actress: ActressCreateInput!): Actress
    scrapeActress(id: Int!): Boolean
    updateActress(actressId: Int!, data: ActressUpdateInput!): Actress
  }
`;
