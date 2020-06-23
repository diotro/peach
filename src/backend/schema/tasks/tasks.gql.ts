import { gql } from 'apollo-server';

export const typeDef = gql`
  enum TaskStatus {
    RUNNING
    PENDING
    ERROR
  }

  type Task {
    id: Int!
    category: String!
    status: TaskStatus!
    parameters: String
    statusMessage: String
  }

  extend type Query {
    tasks: [Task!]!
  }

  extend type Mutation {
    restartTask(taskId: Int!): Task
    cancelTask(taskId: Int!): Boolean
  }
`;