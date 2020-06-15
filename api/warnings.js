module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const warnings = { ...req.body };
    if (req.params.id) warnings.id = req.params.id;

    try {
      existsOrError(warnings.title, "Necessário informar o titulo");
      existsOrError(warnings.text, "Necessário informar o texto");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (warnings.id) {
      app
        .db("warnings")
        .update(warnings)
        .where({ id: warnings.id })
        .then((_) => res.status(204).send("Aviso atualizado com sucesso"))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("warnings")
        .insert(warnings)
        .then((_) => res.status(204).send("Aviso adicionado com sucesso"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("warnings")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Aviso não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const get = (req, res) => {
    const warnings = { ...req.body };
    if (req.params.id) warnings.id = req.params.id;

    if (warnings.id) {
      app
        .db("warnings")
        .select("id", "title", "text", "course")
        .where({ id: warnings.id })
        .then((warnings) => res.json(warnings))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("warnings")
        .select("id", "title", "text", "course")
        .then((warnings) => res.json(warnings))
        .catch((err) => res.status(500).send(err));
    }
  };

  const getWarningCourse = (req, res) => {
    const warnings = { ...req.body };
    if (req.params.course) warnings.id = req.params.course;

    app
      .db("warnings")
      .select("id", "title", "text", "course")
      .where({ course: warnings.id })
      .then((warnings) => res.json(warnings))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getWarningCourse };
};
