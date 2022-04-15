# Installation

Open your favorite text edtitor, and open terminal.

## 1. Yarn installation

---

install yarn globally if you haven't already

```bash
npm install -g yarn
```

## 2. Project installation

---

clone the project to your local computer

```bash
git clone https://github.com/atlp-rwanda/elites-bn-be.git
```

## 3. Install dependencies

---

after opening the project, install all required dependencies from _package.json_ using the following command

```bash
yarn install
```

## 4. Running the app

---

- Running app in development mode

  ```bash
  yarn dev
  ```

- Running app in testing mode

  ```bash
  yarn test
  ```

- Running app in production mode

  ```bash
  yarn start
  ```

  You need to have postgres databases for each envirnoment and put them into their respective variables in `.env` file that you will create in root directory, all environment variables can be found in `env.example` file. Once you have all that in place, congratulations!!😉 you are good to go.
