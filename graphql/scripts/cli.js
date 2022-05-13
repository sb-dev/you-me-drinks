import { LocalFaunaDbClient, importRecipe, importSchema, importSchemaLocally, readRecipes, retrieveTagsAndIngredients } from './main.js';
import { createServerRole, updateServerRole } from './utils/roles.js'
import { userCreation, userLogin } from './utils/functions.js'

import { Command } from 'commander';
import GraphqlClient from './utils/graphqlClient.js';
import Listr from 'listr';
import { createAdminUser } from './utils/mutations.js'
import { createDatabase } from './utils/database.js'
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
    .option('-l, --local', 'Where to setup GraphQL')
    .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'create')
    .action(async (options) => {
      if(options.local) {
        const tasks = new Listr([
          {
            title: 'Create database',
            task: ctx => {
              return new Promise(async (resolve) => {
                const mainFaunaDbClient = LocalFaunaDbClient();
                const { secret } = await mainFaunaDbClient.query(createDatabase('ymdrinks'));
                ctx.dbSecret = secret;
                resolve(secret);
              });
            }
          },
          {
            title: 'Import schema',
            task: ctx => {
              return new Promise(async (resolve) => {
                const { stdout } = await importSchemaLocally(ctx.dbSecret);
                ctx.importSchemaLogs = stdout;
                resolve(stdout);
              });
            }
          },
          {
            title: 'Create server key',
            task: ctx => {
              return new Promise(async (resolve) => {
                const dbFaunaDbClient = LocalFaunaDbClient(ctx.dbSecret);
                const { secret } = await dbFaunaDbClient.query(
                  createServerRole()
                )
                ctx.serverSecret = secret;
                resolve(secret);
              });
            }
          },
          {
            title: 'Create adming user',
            task: ctx => {
              return new Promise(async (resolve) => {
                const dbFaunaDbClient = LocalFaunaDbClient(ctx.dbSecret);
                await dbFaunaDbClient.query(
                  userCreation
                )
                await dbFaunaDbClient.query(
                  userLogin
                )
                const localClient = GraphqlClient(process.env.GRAPHQL_ENDPOINT, ctx.dbSecret);
                const result = await localClient.request(
                  createAdminUser, 
                  {
                    email: 'test@contact.com',
                    name: 'Test User',
                    password: 'password'
                  }
                );
          
                ctx.adminId = result.createUser._id;
                resolve(result);
              });
            }
          },
          {
            title: 'Read data',
            task: ctx => {
              return new Promise(async (resolve) => {
                const localClient = GraphqlClient(process.env.GRAPHQL_ENDPOINT, ctx.dbSecret);
                const recipes = await readRecipes(localClient);
                ctx.recipes = recipes;
                resolve(recipes);
              });
            }
          },
          {
            title: 'Import data',
            task: ctx => {
              const tasks = ctx.recipes.map(recipe => {
                return {
                  title: `Import ${recipe.slug}`,
                  skip: () => {
                    if(recipe.skip) {
                      console.log(`Skipping ${recipe.slug}`);
                      return true;
                    }
                    return false;
                  },
                  task: () => {
                    return new Promise(async (resolve) => {
                      const localClient = GraphqlClient(process.env.GRAPHQL_ENDPOINT, ctx.dbSecret);
                      const data = await retrieveTagsAndIngredients(localClient);
                      const result = await importRecipe(localClient, data, recipe, ctx.adminId);
                      resolve(result);
                    });
                  }
                }
              });
              
              return new Listr(
                tasks
              );
            }
          }
        ]);

        tasks.run().then(ctx => {
          console.log('-- FaunaDB successfully setup --');
          console.log('Admin:', ctx.dbSecret);
          console.log('Server:', ctx.serverSecret);
        }).catch(err => {
          console.error(err);
        });
      } else {
        if (options.setup_mode === 'create') {
          throw 'Not supported yet.';
        } else if (options.setup_mode === 'update') {
          throw 'Not supported yet.';
        } else {
          console.error('unknown mode')
        }
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
    .option('-e, --endpoint <endpoint>', 'Which endpooint to use', process.env.GRAPHQL_ENDPOINT)
    .option('-s, --secret <secret>', 'Which secret mode to use', process.env.DB_ADMIN_KEY)
    .option('-a, --author [author]', 'Which author')
    .description('run import commands')
    .action(async (action, options) => {
      switch(action) {
        case "recipes":
          if (options.setup_mode === 'create') {
            const graphqlClient = GraphqlClient(options.endpoint, options.secret);
            
            const tasks = new Listr([
              {
                title: 'Read data',
                task: ctx => {
                  return new Promise(async (resolve) => {
                    const recipes = await readRecipes(graphqlClient);
                    ctx.recipes = recipes;
                    resolve(recipes);
                  });
                }
              },
              {
                title: 'Import data',
                task: ctx => {
                  const tasks = ctx.recipes.map(recipe => {
                    return {
                      title: `Import ${recipe.slug}`,
                      skip: () => {
                        if(recipe.skip) {
                          return true;
                        }
                        return false;
                      },
                      task: () => {
                        return new Promise(async (resolve) => {
                          const data = await retrieveTagsAndIngredients(graphqlClient);
                          const result = await importRecipe(graphqlClient, data, recipe, options.author);
                          resolve(result);
                        });
                      }
                    }
                  });
                  
                  return new Listr(
                    tasks
                  );
                }
              }
            ]);
    
            tasks.run().then(() => {
              console.log('-- Recipes successfully imported --');
            }).catch(err => {
              console.error(err);
            });
          } else if (options.setup_mode === 'update') {
            throw 'Not supported yet.';
          } else {
            console.error('unknown mode')
          }
          break;
        case "schema":
          const { stdout } = await importSchema(process.env.DB_DOMAIN, process.env.DB_ADMIN_KEY);
          console.log(stdout);
          break;
        case "roles":
          if (options.setup_mode === 'create') {
            const { secret } = await faunaDbclient.query(
              createServerRole
            )

            console.log("Server:", secret)
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
 