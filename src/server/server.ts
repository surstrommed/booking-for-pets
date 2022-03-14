import jsonServer from "json-server";
import auth from "json-server-auth";
const server = jsonServer.create();
const router = jsonServer.router("./src/server/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server["db"] = router["db"];

server.get("/echo", (req, res) => {
  res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.pictureUrl = null;
  }
  next();
});

server.use(auth);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
