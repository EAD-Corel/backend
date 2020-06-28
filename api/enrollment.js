module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = async (req, res) => {
    const enrollments = { ...req.body };
    if (req.params.id) enrollments.id = req.params.id;

    try {
      existsOrError(enrollments.student, "Nessário informar o aluno");
      existsOrError(enrollments.course, "Nessário infomar o curso");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    if (enrollments.id) {
      app
        .db("enrollment")
        .update(enrollments)
        .where({ id: enrollments.id })
        .then((_) => res.status(204).send("Matricula atualizado com sucesso"))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("enrollment")
        .insert(enrollments)
        .then((_) => res.status(204).send("Matricula adicionada com sucesso"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("enrollment")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Matricula não foi encontrada");
      } catch (msg) {
        return res.status(400).send(msg);
      }
      res.status(204).send();
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const get = (req, res) => {
    const enrollments = { ...req.body };
    if (req.params.id) enrollments.id = req.params.id;

    if (enrollments.id) {
      app
        .db("enrollment")
        .select("id", "student", "course")
        .where({ id: enrollments.id })
        .then((enrollments) => res.json(enrollments))
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("enrollment")
        .select("id", "student", "course")
        .then((enrollments) => res.json(enrollments))
        .catch((err) => res.status(500).send(err));
    }
  };

  const getMyCourses = (req, res) => {
    const enrollments = { ...req.body };
    if (req.params.myCourses) enrollments.myCourses = req.params.myCourses;

    app
      .db("enrollment")
      .select("id", "student", "course")
      .where({ student: enrollments.myCourses })
      .then((enrollments) => res.json(enrollments))
      .catch((err) => res.status(500).send(err));
  };

  return { save, remove, get, getMyCourses };
};
