![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TypeScript React](https://img.shields.io/badge/typescript%20react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-%234ea94b.svg?style=for-the-badge&logo=mongoose&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

# FireCode

FireCode is a clone of LeetCode, a platform for developers to practice coding problems and improve their skills. This project was created as a full-stack project _(my first full-stack project)_ using Express, MongoDB, Mongoose, TypeScript,TypeScript React (TSX), CSS3, and Tailwind CSS.

# Demo

You can see the live demo of website at https://fire-code.vercel.app.

# Installation

### Clone the repository and install server and client dependencies:

```bash
git clone https://github.com/ManiGhazaee/FireCode.git
cd FireCode/server
npm install
cd ../client
npm install
```

### Start the client in the `client` directory:

```bash
npm start
```

### Configure the MongoDB Database and JWT Secret:

Before starting the server, make sure to configure the following environment variables in the `server/.env` file:

-   `MONGODB_URI`: Set this variable to your MongoDB connection string.
-   `ACCESS_TOKEN_SECRET`: Set this variable to a secret key for JWT access tokens.

### Configure the API URL:

To use your own API, open the `client/src/App.tsx` file and find the `API_URL` constant. Update its value to match the URL of your deployed server (`http://localhost:80`).

### Start the server in the `server` directory:

```bash
npm start
```

# Features

-   User authentication: Users can create an account, log in, and log out, delete account.
-   Coding problems: Users can browse coding problems, submit solutions.
-   User profile: Users can view their profile, including their solved problems and submissions.

# Technologies Used

-   Express: A web framework for Node.js
-   MongoDB: A NoSQL database
-   Mongoose: A MongoDB object modeling tool
-   TypeScript: A typed superset of JavaScript
-   TypeScript React: A JavaScript library for building user interfaces with TypeScript
-   Tailwind CSS: A utility-first CSS framework
-   CSS: A stylesheet language used to describe the presentation of a document written in HTML or XML

# Server Dependencies

-   acorn
-   bad-words
-   bcrypt
-   cors
-   dotenv
-   express
-   jsonwebtoken
-   mongodb
-   mongoose
-   typescript

# Client Dependencies

-   @uiw/codemirror-extensions-langs
-   @uiw/codemirror-theme-tokyo-night
-   @uiw/react-codemirror
-   axios
-   markdown-it
-   react
-   react-dom
-   react-router-dom
-   react-scripts
-   react-type-animation
-   typescript
-   web-vitals

# Contributing

Contributions are welcome! If you find a bug or have a feature request, please create an issue on GitHub. If you would like to contribute code, please fork the repository and create a pull request.

# License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE.md) file for details.

# Acknowledgments

This project was inspired by LeetCode.
Thanks to the creators of Express, MongoDB, Mongoose, TypeScript, and React.
