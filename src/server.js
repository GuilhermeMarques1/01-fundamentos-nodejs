import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.writeHead(200).end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { nome, email } = req.body;

    const user = {
      id: randomUUID(),
      nome,
      email,
    };

    const data = database.insert("users", user);

    return res.writeHead(201).end(JSON.stringify(data));
  }

  return res.writeHead(404).end();
});

server.listen(3333);
