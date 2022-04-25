import jsonServer from "json-server";
import auth from "json-server-auth";
const server = jsonServer.create();
const router = jsonServer.router("./src/server/db.json");
const middlewares = jsonServer.defaults();
import { isSignupAuthenticated } from "./api/api";

server.use(middlewares);

server["db"] = router["db"];

server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    if (isSignupAuthenticated(req.body.login)) {
      const status = 400;
      const message = "This email or login already exists";
      res.status(status).json(message);
    }
  }
  next();
});

server.use(auth);
server.use(router);
server.listen(3001, () => {
  console.warn("JSON Server is running");
});
