module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const courses = { ...req.body };
    if (req.params.id) courses.id = req.params.id;

    try {
      existsOrError(courses.name, "Necessário informar o nome");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (courses.id) {
      app
        .db("courses")
        .update(courses)
        .where({ id: courses.id })
        .then((_) => res.status(204).send("Curso atualizado com sucesso"))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("courses")
        .insert(courses)
        .then((_) => res.status(204).send("Curso adicionado com sucesso"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("courses")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Curso não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const get = (req, res) => {
    const courses = { ...req.body };
    if (req.params.id) courses.id = req.params.id;

    if (courses.id) {
      app
        .db("courses")
        .select("id", "name", "description", "image")
        .where({ id: courses.id })
        .then((courses) => res.json(courses))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("courses")
        .select("id", "name", "description", "image")
        .then((courses) => res.json(courses))
        .catch((err) => res.status(500).send(err));
    }
  };

  return { save, remove, get };
};
