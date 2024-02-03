const express = require("express");
const checkListRouter = require("./src/routes/checklist");
const taskRouter = require("./src/routes/task");
const rootRouter = require("./src/routes/index");
const path = require("path");
const methodOverride = require("method-override");

//Conexão com o mongo
require("./config/database");

const app = express();

//Middleares nativos
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//Middleares Criados
app.use("/", rootRouter);
app.use("/checklists", checkListRouter);
app.use("/checklists", taskRouter.checklistDependent);
app.use("/tasks", taskRouter.simpleRouter);

app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("Servidor iniciado: http://localhost:3000");
});
