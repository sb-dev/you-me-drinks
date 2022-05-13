import faunadb from 'faunadb';
import fs  from 'fs';
import yaml from 'js-yaml';

const q = faunadb.query;

export const PUBLIC_ROLE = 'public_role';
export const SERVER_ROLE = 'server_role';

const privilegesData = yaml.load(fs.readFileSync('./graphql/security/privileges.yml', 'utf8'));

const resource = (privilege) => {
  if(privilege.resource === 'Index') {
    return q.Index(privilege.resourceName);
  } else {
    return q.Collection(privilege.resourceName);
  }
};

const recipeReads = privilegesData.recipeReads.privileges.map(privilege => {
  return {
    resource: resource(privilege),
    actions: privilege.actions
  }
});

export const createPublicRole = q.CreateRole(
  {
    name: PUBLIC_ROLE,
    privileges: [...recipeReads]
  }
);

export const updatePublicRole = q.Update(
  q.Role(PUBLIC_ROLE),
  {
    privileges: [...recipeReads]
  }
);

export const createServerRole = () => q.Let(
  {
    roleRef: q.CreateRole(
      {
        name: SERVER_ROLE,
        privileges: [...recipeReads]
      }
    )
  },
  q.CreateKey({
    role: q.Select('ref', q.Var('roleRef')),
    data: {
      name: "For SSR/SSG",
    }
  })
)

export const updateServerRole = q.Update(
  q.Role(SERVER_ROLE),
  {
    privileges: [...recipeReads]
  }
);

export const createUserRole =  q.CreateRole({
  name: "user_role",
  membership: {
    resource: q.Collection("User"),
    predicate: q.Query( 
      q.Lambda("userRef",  
        q.Equals(q.Select(["data", "role"], q.Get(q.Var("userRef"))), "USER")
      )
    )
  },
  privileges: [
    {
      resource: q.Index("allRecipes"),
      actions: { read: true } 
    },
    {
      resource: q.Collection("Recipe"),
      actions: { read: true } 
    }
  ]
});

export const createAssociateRole = q.CreateRole({
  name: "associate_role",
  membership: {
    resource: q.Collection("User"),
    predicate: q.Query( 
      q.Lambda("userRef",  
        q.Equals(q.Select(["data", "role"], q.Get(q.Var("userRef"))), "ASSOCIATE")
      )
    )
  },
  privileges: [
    {
      resource: q.Index("allRecipes"),
      actions: { read: true } 
    },
    {
      resource: q.Collection("Recipe"),
      actions: { read: true } 
    }
  ]
});

export const createAdminRole = q.CreateRole({
  name: "admin_role",
  membership: {
    resource: q.Collection("User"),
    predicate: q.Query( 
      q.Lambda("userRef",  
        q.Equals(q.Select(["data", "role"], q.Get(q.Var("userRef"))), "ADMIN")
      )
    )
  },
  privileges: [
    {
      resource: q.Index("allRecipes"),
      actions: { read: true } 
    },
    {
      resource: q.Collection("Recipe"),
      actions: { read: true } 
    }
  ]
});
