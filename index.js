import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import os from "os";
import puppeteer from "puppeteer";
import { exec } from "node:child_process";
import { promisify } from "node:util";
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
app.use((req, res, next) => {
if (req.originalUrl === "/" || req.originalUrl.startsWith("/api")) {
morgan("dev")(req, res, next);
} else {
next();
}
});
app.use((req, res, next) => {
requestCount++;
next();
});

//━━━━━━━━━━━━━━━[ Routes ]━━━━━━━━━━━━━━━━━//

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


app.listen(app.get("port"), async() => {
console.log("RUNNING!")
});



//const { stdout: chromiumPath } = await promisify(exec)("which chromium")
export const browser = await puppeteer.launch({
executablePath:'/usr/bin/google-chrome',
args:["--no-sandbox","--disable-setuid-sandbox"]});
