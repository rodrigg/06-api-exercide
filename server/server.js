const express = require("express");
path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const apollo = require("apollo-server-express");

const users = require("./routes/users");
const cars = require("./routes/cars");
const resolvers = require("./routes/resolvers");
const typeDefs = require("./routes/type-defs");
const expressjwt = require("express-jwt");
const jwtCheck = expressjwt({
  secret: "mysupersecretkey",
});

const app = express();
// setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/users", users);
app.use("/api/cars", jwtCheck, cars);

app.set("port", process.env.PORT || 3050);
app.listen(app.get("port"));
const graphqlServer = new apollo.ApolloServer({
  typeDefs,
  resolvers,
});
graphqlServer.applyMiddleware({ app });

console.log("Listening on port: " + app.get("port"));
console.log(
  `GraphQL server ready at http://localhost:${app.get("port")}${
    graphqlServer.graphqlPath
  }`
);
module.exports = app;
