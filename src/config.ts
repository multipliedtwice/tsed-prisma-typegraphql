import { PrismaClient } from "@prisma/client";
import { FileSyncAdapter } from "@tsed/adapters";
import { readFileSync } from "fs";
import {
  FindManyTalentProfileArgs,
  FindManyUserResolver,
  TalentProfileRelationsResolver,
  UserRelationsResolver,
} from "~generated/index";
const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const prisma = new PrismaClient();

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  typegraphql: {
    default: {
      path: "/graphql",
      context: async () => {
        console.log(Date.now());
        return { prisma };
      },
      buildSchemaOptions: {
        validate: false,
        resolvers: [
          // Main resolvers
          FindManyTalentProfileArgs,
          FindManyUserResolver,

          // Include resolvers
          TalentProfileRelationsResolver,
          UserRelationsResolver,
        ],
      },
    },
  },
  adapters: [FileSyncAdapter],
};
