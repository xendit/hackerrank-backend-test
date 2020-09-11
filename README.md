# hackerank-backend-test

[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=xendit/hackerank-backend-test&identifier=212729010)](https://dependabot.com)

## Ownership

Team: [Your team](https://www.draw.io/?state=%7B%22ids%22:%5B%221Vk1zqYgX2YqjJYieQ6qDPh0PhB2yAd0j%22%5D,%22action%22:%22open%22,%22userId%22:%22104938211257040552218%22%7D)

Slack Channel: [#team-channel](https://xendit.slack.com/messages/general)

Slack Mentions: `@team-mention`

## Conventions

### File Name

We prefer hyphens (kebab-case) **this-file-name** vs underscores (snake_case) this_file_name

## Development

Prerequisite

-   VSCode
-   Installed Docker
-   Node LTS

### Start development environment

-   Create `.env` file or run `cp .env.example .env`
-   Create `.npmrc` file or run `cp .npmrc.example .npmrc`

You can look for the example in the `.env.example` and `.npmrc.example`. Paste the actual token in newly created `.npmrc` file.

`.npmrc.example` will be where you would put non sensitive npm configs that you would like to be shared across your team.

Next up you can choose to run your development environment entirely inside Docker or to run the app server directly on your local machine.

**Running app server inside Docker**

-   Start the development cluster

```bash
docker-compose up -d
```

-   View consolidated logs via Docker Compose

```bash
docker-compose logs -f
```

-   Log into app container

```bash
# the command below will open a shell session inside our app container
docker exec -it hackerank-backend-test sh
# this is for executing CLI in dev env, for i.e. DB migration command like below
npm run migration:run
```

-   Shutdown development cluster

```bash
docker-compose down
```

**Running app server directly on your local machine's environment**

-   Start the db service in Docker

```bash
docker-compose up -d postgres
```

-   Start your app server

```bash
npm run start:dev
# you might also want to migrate the DB with this command below
npm run migration:run
```

-   Shutdown development cluster

```bash
docker-compose down
```

## Testing

Prerequisite

-   Installed Docker
-   Node LTS

**Run the test**

In order to run tests, you need to have a local postgresql running for your test environment:

```bash
# dockest runs a test postgres container for your tests
npm run test:dockest
```

### Load Testing

We're using [locust.io](https://locust.io/) for load testing

Pre-requisite

-   [Python3](https://www.python.org/downloads/)
-   [Virtualenv](https://pypi.org/project/virtualenv/)

Setup virtualenv in your local

```bash
virtualenv -ppython3 venv
source venv/bin/activate
```

Install requirements

```bash
pip install -r requirements.txt
```

Run locust

```bash
locust --host=http://localhost:3000
```

Open the [UI](http://localhost:8089)

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

## Adding CI/CD via Buddy Works

1. Sign into [Buddy.Works](http://buddy.works) and [add your repository as a project](https://app.buddy.works/xendit/create-project)
2. At your project page on Buddy.Works, click on 'Clone existing pipeline'
3. Select `hackerank-backend-test` to clone from, and clone the pipelines
    - Build and Test on every commit
    - Build, Test and Deploy to Production on new release (We don't have EKS in production yet so this pushes to staging still)
    - Build, Test and Deploy to Staging on push to master
    - Deploy Mock Server to Staging
4. In your local repository, push an empty commit to staging:
    ```bash
    git commit --allow-empty -m "Empty commit to init deployment"
    git push origin master
    ```
5. Check if the pipelines are running in your project on Buddy.Works. The pipeline `Build, Test and Deploy to Staging on push to master` should have deployed your service to the Staging EKS cluster!
6. You are now ready to write your features! 🚀

## Accesing your Kubernetes services in your local environment

1. Install `kubectl` from the instructions at [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-macos)

1. Install aws-cli to authenticate to the EKS cluster. And then configure AWS. Enter your access key and secret access key, then choose ap-southeast-2 so that you can access the staging environment in EKS.

    ```bash
    pip3 install awscli --user
    aws configure
    ```

1. Setup `kubectl` configuration (WIP)

1. See if your pods are up:

    ```
    kubectl get pods --namespace={YOUR_TEAM_NAME}
    ```

1. Check for deployments:
    ```
    kubectl get deployments --namespace={YOUR_TEAM_NAME}
    ```
