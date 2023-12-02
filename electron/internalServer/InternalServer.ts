import { app, shell } from "electron";
import http from 'http';
import express from 'express';
import cors from "cors";
import {Server as SocketServer} from "socket.io";



export class InternalServer {
  app: Electron.App | undefined;
  server: Express.Application | undefined;

  userDataPath: string;

  port: number;
  io: SocketServer | undefined;
  
  socketPort: number;


  constructor(options: any = {}) {
    this.app;
    this.server;
    this.io;
    this.port = 9045;
    this.socketPort = 3000;
    this.userDataPath = app.getPath('userData');
  }

  async init(app: Electron.App) {
    this.app = app;
    this.initServer();
    this.initSocket();
  };

  initServer() {
    this.server = express();
    this.server.use(cors());
    this.server.use(express.json()); 
    this.handleRoutes();

    this.server.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}/`);
    });
  }


  initSocket() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const server = http.createServer(app);

    this.io = new SocketServer(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    // log server address
    this.io.on("listening", () => {
      console.log("server started");
    });


    this.io.on("connection", (socket) => {
      console.log("client connected");

      socket.on("disconnect", () => {
        console.log("client disconnected");
      });

    });

    server.listen(this.socketPort, () => {
      console.log(`Socket running at http://localhost:${this.socketPort}/`);
    }
    );

  }


  handleRoutes() {

    if (!this.server) {
      console.log("handleRoutes: server is undefined");
      return;
    }


    this.server.post("/open", async (req, res) => { this.openInBrowser(req.body.url); });
    this.server.post("/exit", async (req, res) => { app.quit(); });
  }


  openInBrowser(url: string) {
    shell.openExternal(url);
  }  

}