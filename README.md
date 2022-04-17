## Elites-barefoot-Backend

[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![CircleCI](https://circleci.com/gh/atlp-rwanda/elites-bn-be.svg?style=svg)](https://circleci.com/gh/atlp-rwanda/elites-bn-be)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/elites-bn-be/badge.png)](https://coveralls.io/github/atlp-rwanda/elites-bn-be)

[click here for Barefoot Nomad Documentation](http://rwanda.andela.com/elites-bn-be/#/)

## INSTALLATION

### Requirements

> For development, you need to have node installed and global yarn package installed in your environment.

#### Node

##### Node installation on windows

> Just go to the [ offficial Nodejs website](https://nodejs.org) and download the installer.
> in addition, make sure you have `git` available in your path. `npm` migth need it. Find it [here](https://git-scm.com)

##### Node installation on Linux and other operating system

> Refer to the [documentation](https://nodejs.org) and offical npm website [npm website](https://npmjs.com)

#### Yarn installation

```ps
npm install -g yarn
```

### Project Installaton

> clone the project, by running the commands below in your terminal(in your favorite code editor)

```ps
git clone https://github.com/atlp-rwanda/elites-bn-be.git
```

```ps
cd elites-bn-be
```

> package installation

```ps
yarn install
```

### Running the app

> Before running the project locally, make sure you have all required environment variables in your .env file.
> you can find the required environment variables in `.env.sample` file.

#### Database migration and seeding

> Run migrations

```ps
yarn migrate
```

> Run seed

```ps
yarn seed
```

> development mode

```ps
yarn dev
```

> testing mode

```ps
yarn test
```

> production mode

```ps
yarn start
```

> undo migration

```ps
yarn  migrate:undo
```

> undo seed

```ps
yarn seed:undo
```

> ESLint Fix

```ps
 yarn run lint
```

#### Documentation

##### Swagger documentation endpoint for your the backend project

> Replace {port} with your port on which development server is running ex:http://localhost:3000/docs/swagger-ui/

```ps
http://localhost:{port}/docs/swagger-ui/
```

#### Docker-compose

##### Docker installation

> download docker Destop [here](https://docs.docker.com/desktop/windows/install/)
> or use docker toolbox CLI [here](https://github.com/docker-archive/toolbox/releases/download/v19.03.1/DockerToolbox-19.03.1.exe)

###### run docker-compose

```ps
docker-compose up -d
```

## Contributors

- [Honore IRADUKUNDA](https://github.com/ihonore)
- [David NKUNDINEZA](https://github.com/Dev-nkundineza)
- [Innocente Gihozo](https://github.com/gihozoinnocente)
- [Aristide NIYONGABO](https://github.com/niyongaboaristide17)
- [Eric Maniraguha](https://github.com/ericmaniraguha)
- [Patrick TUYISHIMIRE YANGENEYE](https://github.com/PatrickTUy)
