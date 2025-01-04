import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import ejs from "ejs";
import os from "os";
import axios from "axios";
import cheerio from "cheerio";
import { parseISO, formatDistanceToNow } from "date-fns";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import apiRoutes from "./routes/api.js";
const app = express();

//━━━━━━━━━━━━━━━[ Helper Functions ]━━━━━━━━━━━━━━━━━//
const getFeatureList = (req) => {
const routes = [];
const extractRoutes = (stack, basePath = '') => {
stack.forEach((middleware) => {
if (middleware.route) {
routes.push(`${req.protocol}://${req.get('host')}${basePath}${middleware.route.path}`);
} else if (middleware.handle && middleware.handle.stack) {
extractRoutes(middleware.handle.stack, basePath + (middleware.regexp.source.replace('^\\/', '/').replace('\\/?$', '') || ''));
}
});
};
extractRoutes(app._router.stack);
return routes;
};

function formatUptime(uptime) {
let seconds = Math.floor(uptime % 60);
let minutes = Math.floor((uptime / 60) % 60);
let hours = Math.floor((uptime / 3600) % 24);
let days = Math.floor(uptime / 86400);

if (days > 0) {
  return `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

//━━━━━━━━━━━━━━━[ App Configuration ]━━━━━━━━━━━━━━━━━//
app.set("port", process.env.PORT || 4000);
app.get("/uptime", (req, res) => {
res.json({
uptime: formatUptime(process.uptime())})  
})
let requestCount = 100;
app.use((req, res, next) => {
requestCount++;
console.log(`${req.method} ${req.url}`);
next();
});

app.get('/status', (req, res) => {
res.json({
platform: os.platform(),
cpu_model: os.cpus()[0].model, 
free_ram: (os.freemem() / Math.pow(1024, 3)).toFixed(2) + " GB", 
ram: (os.totalmem() / Math.pow(1024, 3)).toFixed(2) + " GB", 
runtime: formatUptime(process.uptime()),
request: requestCount
});
});

//━━━━━━━━━━━━━━━[ Middleware ]━━━━━━━━━━━━━━━━━//
app.enable('trust proxy');
app.set("json spaces",2);

app.use(express.static(path.join(__dirname, 'views')));
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//━━━━━━━━━━━━━━━[ View Engine Configuration ]━━━━━━━━━━━━━━━━━//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//━━━━━━━━━━━━━━━[ Routes ]━━━━━━━━━━━━━━━━━//
app.get("/", async(req, res) => {
const response = await axios.get('https://api.github.com/repos/KurniawanSatria/IDK',{headers: {'Authorization': `Bearer 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`}})
const lastUpdateISO = response.data.updated_at;
const lastUpdate = lastUpdateISO ? formatDistanceToNow(parseISO(lastUpdateISO), { addSuffix: true }) : "Unknown";
res.render('index', {total_request: requestCount, feature_list: getFeatureList(req).length, uptime: formatUptime(process.uptime()), last_update: lastUpdate.split("about ")[1]});
});



app.use("/api", apiRoutes);

//━━━━━━━━━━━━━━━[ Server Initialization ]━━━━━━━━━━━━━━━━━//
app.listen(app.get("port"), () => {
console.log(`Server on port ${app.get("port")}`);
});
