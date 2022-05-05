import { createRecipes, importSchema } from './main.js';
import { createServerRole, updateServerRole } from './utils/roles.js'
import { userCreation, userLogin } from './utils/functions.js'

import { Command } from 'commander';
import GraphqlClient from './utils/graphqlClient.js';
import { createAdminUser } from './utils/mutations.js'
import { createServerKey } from './utils/keys.js'
import dotenv from 'dotenv';
import faunadb from 'faunadb';

dotenv.config()

/*
 *
 * GraphQL cli
 *
 * Setup DB
 * Create/Login user
 * Import recipes
 * Import ingredients
 * Import functions
 * Import roles
 * Create keys
 *
 */
export const cli = (args) => {
  const program = new Command();
  const client = GraphqlClient(process.env.GRAPHQL_ENDPOINT, process.env.DB_ADMIN_KEY)

  const faunaDbclient = new faunadb.Client({ 
    secret: process.env.DB_ADMIN_KEY,
    domain: process.env.DB_DOMAIN
  });

  program
    .name('graphQL')
    .version('0.0.1');

  program
    .command('setup')
    .description('run GraphQL setup commands for FaunaDB')
    .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'create')
    .action((options) => {
      if (options.setup_mode === 'create') {
        throw 'Not supported yet.';
      } else if (options.setup_mode === 'update') {
        throw 'Not supported yet.';
      } else {
        console.error('unknown mode')
      }
    });

    program
    .command('login')
    .option('-e, --email <email>', 'Which email address to use')
    .option('-p, --password <password>', 'Which password to use')
    .description('run user commands')
    .action(async (options) => {
      throw 'Not supported yet.';
    });

  program
    .command('create-user')
    .option('-n, --name <name>', 'Which display name to use')
    .option('-e, --email <email>', 'Which email address to use')
    .option('-p, --password <password>', 'Which password to use')
    .description('run user commands')
    .action(async (options) => {
      const result = await client.request(
        createAdminUser, 
        {
          email: options.email,
          name: options.name,
          password: options.password
        }
      );

      console.log(result);
    });

  program
    .command('import <entity>')
    .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'create')
    .description('run import commands')
    .action(async (action, options) => {
      switch(action) {
        case "recipes":
          if (options.setup_mode === 'create') {
            createRecipes(client);
          } else if (options.setup_mode === 'update') {
            throw 'Not supported yet.';
          } else {
            console.error('unknown mode')
          }
          break;
        case "schema":
          importSchema();
          break;
        case "roles":
          if (options.setup_mode === 'create') {
            await faunaDbclient.query(
              createServerRole
            )

            const result = await faunaDbclient.query(
              createServerKey
            )

            console.log(result)
          } else if (options.setup_mode === 'update') {
            await faunaDbclient.query(
              updateServerRole
            )
          } else {
            console.error('unknown mode')
          }
          break;
        case "functions":
          await faunaDbclient.query(
            userCreation
          )
          await faunaDbclient.query(
            userLogin
          )
          break;
        default:
          console.log('unknown entity')
      }
    });

  program.parse(args);
 }
 