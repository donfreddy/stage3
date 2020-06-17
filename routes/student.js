const studentRoutes = (app, fs) => {

  const dataPath = "./data/students.json";

  const readFile = (
    callback,
    returnJson = false,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = "utf8"
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }

      callback();
    });
  };


  // CREATE
  app.post("/students", (req, res) => {
    readFile((data) => {
      const newStudentId = Object.keys(data).length + 1;
      data[newStudentId] = JSON.parse(req.body.data);

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new student added");
      });
    }, true);
  });


  // READ
  app.get("/students", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(JSON.stringify(data)));
    });
  });

  // UPDATE
  app.put("/students/:id", (req, res) => {
    readFile((data) => {

      const userId = req.params["id"];
      data[userId] = JSON.parse(req.body.data);

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`users id:${userId} updated`);
      });
    }, true);
  });

  // DELETE
  app.delete("/students/:id", (req, res) => {
    readFile((data) => {
      const userId = req.params["id"];
      delete data[userId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`students id:${userId} removed`);
      });
    }, true);
  });
};

module.exports = studentRoutes;