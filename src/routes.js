import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const users = database.select("users");

      return res.writeHead(200).end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { nome, email } = req.body;

      const user = {
        id: randomUUID(),
        nome,
        email,
      };

      const data = database.insert("users", user);

      return res.writeHead(201).end(JSON.stringify(data));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.detele("users", id);

      return res.writeHead(204).end();
    },
  },
];
