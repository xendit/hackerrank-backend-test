# hackerank-backend-test

## Conventions

### File Name

We prefer hyphens (kebab-case) **this-file-name** vs underscores (snake_case) this_file_name

## Development

Prerequisite

-   VSCode
-   Node LTS

### Start development environment

**Running app server directly on your local machine's environment**

-   Start your app server

```bash
npm start
# you might also want to migrate the DB with this command below
npm run migration:run
```

## Testing

Prerequisite

-   Node LTS

**Run the test**

```bash
npm test
```

## Database migration

Before continuing, please learn about the fundamentals of migration with TypeORM [here](https://medium.com/better-programming/typeorm-migrations-explained-fdb4f27cb1b3)

### On first time setting up the DB

Run migration

```bash
npm run migration:run
```

### If you made new changes to the db

Modifying columns in entities, or adding new entities (migration file is a class, start with CapitalLetter) Please refer to 1571751456489-Init.ts for changes to be made to the migration file to satisfy linting rules

It's a good idea to generate a new migration for every atomic changes made to the db

Generate migration

```bash
npm run migration:generate -- -n <migration-name> # eg. add-disbursement-column
```

### If you made a mistake on running migration

Revert will revert migration file by file

Revert migration

```bash
npm run migration:revert
```

### If you need a manual migration

For eg you need to add new extensions or simply custom migration

Create migration

```bash
npm run migration:create -- -n <MigrationName>
```