import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
let part_one_trigger = "no";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/chapterone", (req, res) => {
    res.render("mvp.ejs", {part_one_trigger});
});

app.get("/api/trigger-state", (req, res) => {
    res.json({ part_one_trigger });
});

app.post("/api/trigger-state", (req, res) => {
    part_one_trigger = req.body.trigger;
    res.json({ part_one_trigger });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});