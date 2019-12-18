import { Router } from "express";

const routes = new Router();

const project = [];

function checkExistId(req, res, next) {
  for (let count = 0; count < project.length; count++) {
    if (project[count].id == req.body.id) {
      return res.status(500).json({ error: "This id is already in use." });
    }
  }
  return next();
}

routes.use((req, res, next) => {
  console.clear();
  console.log(`Método:${req.method}`);
  console.time("Time");
  console.timeEnd("Time");
  console.count();
  return next();
});

routes.get("/projects", (req, res) => {
  return res.json(project);
});

routes.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  return res.json(project[id]);
});

routes.post("/projects", checkExistId, (req, res) => {
  const { title, task = [] } = req.body;
  const id = project.length;
  const newProject = { id, title, task };

  project.push(newProject);

  return res.json(project);
});

routes.put("/projects/:id", checkExistId, (req, res) => {
  const { id } = req.params;
  project[id] = req.body;
  return res.json(project);
});

routes.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  project.splice(id, 1);
  return res.send();
});

export default routes;
