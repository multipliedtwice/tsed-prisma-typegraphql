import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { buildSchema } from "type-graphql";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import {
  FindManyTalentProfileArgs,
  FindManyUserResolver,
  TalentProfileRelationsResolver,
  UserRelationsResolver,
} from "~generated/index";

interface MyContext {
  token?: string;
}
export const prisma = new PrismaClient();

(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [
        // Main resolvers
        FindManyTalentProfileArgs,
        FindManyUserResolver,

        // Include resolvers
        TalentProfileRelationsResolver,
        UserRelationsResolver,
      ],
      validate: false,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    morgan("tiny"),
    expressMiddleware(server, {
      context: async () => {
        console.log(Date.now());
        return { prisma };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4001 }, resolve)
  );
  console.log(`🚀 Public Server ready http://localhost:4001/graphql`);
})();
