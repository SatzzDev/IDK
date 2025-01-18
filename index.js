import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import os from "os";
import fs from 'fs';
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import apiRoutes from "./routes/api.js";
const app = express();

//━━━━━━━━━━━━━━━[ Helper Functions ]━━━━━━━━━━━━━━━━━//
const getFeatureList = (req) => {
const routes = [];
const extractRoutes = (stack, basePath = '/api') => {
stack.forEach((m) => {
if (m.route) routes.push(`/api${m.route.path}`);
else if (m.handle?.stack) extractRoutes(m.handle.stack, basePath + (m.regexp.source.replace('^\\/', '/').replace('\\/?$', '') || ''));
});
};
extractRoutes(app._router.stack);
return routes.sort();
};

function formatUptime(uptime) {
let seconds = Math.floor(uptime % 60);
let minutes = Math.floor((uptime / 60) % 60);
let hours = Math.floor((uptime / 3600) % 24);
let days = Math.floor(uptime / 86400);

if (days > 0) {
return { days: `${days}d`, hours: hours.toString(), minutes: minutes.toString(), seconds: seconds.toString() };
}
return { hours: hours.toString(), minutes: minutes.toString(), seconds: seconds.toString() };
}

const listGetEndpoints = (app) => {
const routes = [];
app._router.stack.forEach((middleware) => {
if (middleware.route && middleware.route.methods.get) {
routes.push(middleware.route.path);
}
});
return routes;
};

//━━━━━━━━━━━━━━━[ App Configuration ]━━━━━━━━━━━━━━━━━//
app.set("port", process.env.PORT || 80);

//━━━━━━━━━━━━━━━[ Middleware ]━━━━━━━━━━━━━━━━━//
app.enable('trust proxy');
app.set("json spaces", 2);

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'views/assets')));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//━━━━━━━━━━━━━━━[ Morgan Logging for Specific Routes ]━━━━━━━━━━━━━━━━━//
let requestCount = 100;

// Morgan hanya untuk route '/' dan '/api'
app.use((req, res, next) => {
if (req.originalUrl === "/" || req.originalUrl.startsWith("/api")) {
morgan("dev")(req, res, next);
} else {
next();
}
});

// Total request counter
app.use((req, res, next) => {
requestCount++;
next();
});

//━━━━━━━━━━━━━━━[ Routes ]━━━━━━━━━━━━━━━━━//
app.get("/uptime", (req, res) => res.json(formatUptime(process.uptime())));

app.get("/status", (req, res) => {
res.json({
platform: os.platform(),
cpu_model: os.cpus()[0].model,
free_ram: (os.freemem() / Math.pow(1024, 3)).toFixed(2) + " GB",
ram: (os.totalmem() / Math.pow(1024, 3)).toFixed(2) + " GB",
runtime: formatUptime(process.uptime()),
request: requestCount
});
});

app.use("/api", apiRoutes);
const menuItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'menu.json'), 'utf8'));
app.get("/", async (req, res) => {
res.render('index', { total_request: requestCount, endpoint_total: getFeatureList(app).length, menuItems });
});

app.get("/embed", async (req, res) => {
res.render('embed');
});

//━━━━━━━━━━━━━━━[ 404 Route ]━━━━━━━━━━━━━━━━━//
app.use((req, res, next) => {
res.status(404).render('404');
});

//━━━━━━━━━━━━━━━[ Server Initialization ]━━━━━━━━━━━━━━━━━//
app.listen(app.get("port"), () => {
console.log(`METHOD | URL | STATUS | TIME`);
});
