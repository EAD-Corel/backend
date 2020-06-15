const multer = require("multer");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const classes = { ...req.body };
    if (req.params.id) classes.id = req.params.id;

    try {
      existsOrError(classes.name, "Necessário informar o nome");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (classes.id) {
      app
        .db("classes")
        .update(classes)
        .where({ id: classes.id })
        .then((_) => res.status(204).send("Aula atualizada com sucesso"))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("classes")
        .insert(classes)
        .then((_) => res.status(204).send("Aula adicionada com sucesso"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("classes")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Aula não foi encontrada");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const get = (req, res) => {
    const classes = { ...req.body };

    if (req.params.id) classes.id = req.params.id;

    if (classes.id) {
      app
        .db("classes")
        .select(
          "id",
          "name",
          "course",
          "module",
          "description",
          "video",
          "author"
        )
        .orderBy("id", "asc")
        .where({ id: classes.id })
        .then((classes) => res.json(classes))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("classes")
        .select(
          "id",
          "name",
          "course",
          "module",
          "description",
          "video",
          "author"
        )
        .orderBy("id", "asc")
        .then((classes) => res.json(classes))
        .catch((err) => res.status(500).send(err));
    }
  };

  const getClassesModule = (req, res) => {
    const classes = { ...req.body };

    if (req.params.module) classes.id = req.params.module;
    app
      .db("classes")
      .select(
        "id",
        "name",
        "course",
        "module",
        "description",
        "video",
        "author"
      )
      .orderBy("id", "asc")
      .where({ module: classes.id })
      .then((classes) => res.json(classes))
      .catch((err) => res.status(500).send(err));
  };

  const uploadVideo = (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "videos");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    const upload = multer({ storage: storage }).single("file");

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send(err);
      } else if (err) {
        return res.status(500).send(err);
      }

      return res.status(200).send(req.file);
    });
  };

  const getVideo = (req, res) => {
    const path = `videos/${req.params.video}`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      const chunksize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(path).pipe(res);
    }
  };

  return { save, remove, get, getClassesModule, uploadVideo, getVideo };
};
