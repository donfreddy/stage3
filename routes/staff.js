const staffRoutes = (app, fs) => {

  const dataPath = "./data/staffs.json";

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
  app.post("/staffs", (req, res) => {
    readFile((data) => {
      const newStaffId = Object.keys(data).length + 1;
      data[newStaffId] = JSON.parse(req.body.data);

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send("new staffs added");
      });
    }, true);
  });


  // READ
  app.get("/staffs", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(JSON.stringify(data)));
    });
  });

  // UPDATE
  app.put("/staffs/:id", (req, res) => {
    readFile((data) => {

      const staffId = req.params["id"];
      data[staffId] = JSON.parse(req.body.data);

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`staff id:${staffId} updated`);
      });
    }, true);
  });

  // DELETE
  app.delete("/staffs/:id", (req, res) => {
    readFile((data) => {
      const staffId = req.params["id"];
      delete data[staffId];

      writeFile(JSON.stringify(data, null, 2), () => {
        res.status(200).send(`staff id:${staffId} removed`);
      });
    }, true);
  });
};

module.exports = staffRoutes;