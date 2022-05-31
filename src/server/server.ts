import jsonServer from "json-server";
import auth from "json-server-auth";

const router = jsonServer.router("./src/server/db.json");
const server = jsonServer.create();
const middleware = jsonServer.defaults();

server.use(middleware);
server["db"] = router["db"];
server.use(jsonServer.bodyParser);

server.use(auth);
server.use(router);
server.listen(3001, () => {
  console.warn("JSON Server is running");
});
