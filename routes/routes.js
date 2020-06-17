const studentRoutes = require("./student");
const staffRoutes = require("./staff");
const courseRoutes = require("./course");

const appRouter = (app, fs) => {

  app.get("/", (req, res) => {
    res.render('index');
  });

  studentRoutes(app, fs);
  staffRoutes(app, fs);
  courseRoutes(app, fs);
};

module.exports = appRouter;