const path = require("path");
const express = require("express");
const fs = require("fs");
const { renderToString } = require("@vue/server-renderer");

const relativeRootPath = "../dist";

const manifest = require(`${relativeRootPath}/server/ssr-manifest.json`);

const server = express();

const appPath = path.join(
  __dirname,
  relativeRootPath,
  "server",
  manifest["app.js"]
);
// 获取服务端的 createApp
const createApp = require(appPath).default;

// 处理客户端静态资源请求
server.use(
  "/img",
  express.static(path.join(__dirname, `${relativeRootPath}/client`, "img"))
);
server.use(
  "/js",
  express.static(path.join(__dirname, `${relativeRootPath}/client`, "js"))
);
server.use(
  "/css",
  express.static(path.join(__dirname, `${relativeRootPath}/client`, "css"))
);
server.use(
  "/favicon.ico",
  express.static(
    path.join(__dirname, `${relativeRootPath}/client`, "favicon.ico")
  )
);

// 统一返回 index.html
server.get("*", async (req, res) => {
  const { app } = createApp();

  const appContent = await renderToString(app);

  fs.readFile(
    path.join(__dirname, `${relativeRootPath}/client/index.html`),
    (err, html) => {
      if (err) {
        throw err;
      }

      html = html
        .toString()
        .replace('<div id="app">', `<div id="app">${appContent}`);
      res.setHeader("Content-Type", "text/html");
      res.send(html);
    }
  );
});

server.listen(8081, (err) => {
  if (!err) {
    console.log("You can navigate to http://localhost:8080");
  }
});
