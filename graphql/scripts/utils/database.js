import faunadb from 'faunadb';
const q = faunadb.query;

export const createDatabase = databaseName => q.Let(
  {
    databaseRef: q.CreateDatabase({
      name: databaseName
    })
  },
  q.CreateKey({
    role: 'admin',
    database: q.Select('ref', q.Var('databaseRef'))
  })
)
