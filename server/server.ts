/* eslint-disable @typescript-eslint/ban-ts-comment */
import jsonServer from "json-server";
import { mockData } from "./data/index";
const server = jsonServer.create();
const router = jsonServer.router(mockData);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// @ts-ignore
router.render = (req, res) => {
  const data = res.locals.data;
  res.jsonp(data);
};

server.listen(3000, () => {
  console.log("JSON server is running");
});
