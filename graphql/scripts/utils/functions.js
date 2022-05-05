import faunadb from 'faunadb';

const q = faunadb.query;

export const userCreation = q.Update(q.Function("create_user"), {
  "body": q.Query(
    q.Lambda(["input"],
    q.Create(q.Collection("User"), {
        data: {
          email: q.Select("email", q.Var("input")),
          name: q.Select("name", q.Var("input")),
          role: q.Select("role", q.Var("input")),
        },
        credentials: {
          password: q.Select("password", q.Var("input"))
        }
      })  
    )
  )
});

export const userLogin = q.Update(q.Function("login_user"), {
  "body": q.Query(
    q.Lambda(["input"],
    q.Select(
        "secret",
        q.Login(
          q.Match(q.Index("unique_User_email"), q.Select("email", q.Var("input"))), 
          { password: q.Select("password", q.Var("input")) }
        )
      )
    )
  )
});
