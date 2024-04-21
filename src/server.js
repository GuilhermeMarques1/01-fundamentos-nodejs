import http from "node:http";
import { json } from "./middlewares/json.js";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    return res.writeHead(200).end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { id, nome, email } = req.body;

    users.push({
      id,
      nome,
      email,
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
