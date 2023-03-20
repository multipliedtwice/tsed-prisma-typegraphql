# How to run

## 1

```
yarn
```

## 2

```
sudo docker run --rm -it -v postgres-15.1:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15.1
```

## 3

```
yarn prisma:generate
```

## 4

```
yarn dev:express
```

Open http://localhost:4001/graphql, then perform some query, like

```
query Query($take: Int) {
  users(take: $take) {
    displayName
    profile {
      profileName
    }
  }
}
```

```
Variables:
{
  "take": 1
}
```

Please notice that FieldResolver is working, we're able to query relations.

## 5

Tsed server will fail to start, if you open `prisma/generated/resolvers/crud/TalentProfile/FindManyTalentProfileResolver.ts` and change decorator to `@ResolverService` - it will work
