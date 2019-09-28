// Queries
import { query } from "./query";
//Mutations
import { mutation } from "./mutation";

export default {
  Mutation: {
    ...mutation
  },
  Query: {
    ...query
  }
};