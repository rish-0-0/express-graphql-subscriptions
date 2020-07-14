import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import merge from 'lodash.merge';
import path from "path";
import { userResolver } from "./schemas/users.resolver";
import { chatResolver } from './schemas/chats.resolver';
import { messagesResolver } from './schemas/messages.resolver';

export const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "./schemas"), { extensions: ["graphql"] }),
  { all: true }
);

export const resolvers = merge({}, userResolver, chatResolver, messagesResolver);
