module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const modules = { ...req.body };
    if (req.params.id) modules.id = req.params.id;

    try {
      existsOrError(modules.name, "Necessário informar o nome");
      existsOrError(
        modules.idCourse,
        "Necessário informa a que curso pertence"
      );
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (modules.id) {
      app
        .db("modules")
        .update(modules)
        .where({ id: modules.id })
        .then((_) => res.status(204).send("Modulo atualizado com sucesso"))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("modules")
        .insert(modules)
        .then((_) => res.status(204).send("Modulo adicionado com sucesso"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("modules")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Modulo não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const get = (req, res) => {
    const modules = { ...req.body };

    if (req.params.id) modules.id = req.params.id;

    if (modules.id) {
      app
        .db("modules")
        .select("id", "name", "description", "idCourse")
        .where({ id: modules.id })
        .then((modules) => res.json(modules))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("modules")
        .select("id", "name", "description", "idCourse")
        .then((modules) => res.json(modules))
        .catch((err) => res.status(500).send(err));
    }
  };

  const getModulesCourse = (req, res) => {
    const modules = { ...req.body };

    if (req.params.idCourse) modules.id = req.params.idCourse;
    app
      .db("modules")
      .select("id", "name", "description", "idCourse")
      .where({ idCourse: modules.id })
      .then((modules) => res.json(modules))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getModulesCourse };
};
