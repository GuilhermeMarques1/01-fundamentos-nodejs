import http from "node:http";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const body = JSON.parse(Buffer.concat(buffers).toString());

  console.log(body);

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .writeHead(200)
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
