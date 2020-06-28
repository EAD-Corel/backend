const bcrypt = require("bcrypt");

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.confirmPassword, "Confirmação de senha inválida");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");

      const userFromDB = await app
        .db("users")
        .where({ email: user.email })
        .first();

      if (!user.id) {
        notExistsOrError(userFromDB, "Usuário já cadastrado");
      }
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then((_) => res.status(204).send("Usuário atualizado com sucesso"))
        .catch(res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send("Usuário adicionado com sucesso"))
        .catch((err) => res.status(500).send(err));
    }
  };

  const update = async (req, res) => {
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.email, "E-mail não informado");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    app
      .db("users")
      .update(user)
      .where({ id: user.id })
      .then((_) => res.status(204).send("Usuário atualizado com sucesso"))
      .catch((err) => res.status(500).send(err));
  };

  const get = async (req, res) => {
    const user = { ...req.params };

    if (user.userId) {
      const enrollments = await app
        .db("enrollment")
        .select("id", "student", "course")
        .where({ student: req.params.userId })
        .then((enrollments) => enrollments);

      const user = await app
        .db("users")
        .select(
          "id",
          "name",
          "email",
          "telefone",
          "registration_date",
          "avatar",
          "admin"
        )
        .where({ id: req.params.userId })
        .then((user) => user);

      const info = {
        user,
        enrollments,
      };

      res.status(200).send(info);
    } else {
      app
        .db("users")
        .select("id", "name", "email", "telefone", "registration_date", "admin")
        .then((users) => res.json(users))
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db("users")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, "Usuário não foi encontrado");
      } catch (msg) {
        return res.status(400).send(msg);
      }

      res.status(400).send("Deletado com sucesso");
    } catch (msg) {
      res.status(500).send(msg);
    }
  };

  const alterPassword = async (req, res) => {
    const user = { ...req.body };

    if (req.params.id) user.id = req.params.id;

    try {
      existsOrError(user.password, "Senha não informada");
      existsOrError(user.confirmPassword, "Confirmação de senha não informada");
      equalsOrError(user.password, user.confirmPassword, "Senhas não conferem");
    } catch (msg) {
      return res.status(400).send(msg);
    }

    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    app
      .db("users")
      .update(user)
      .where({ id: user.id })
      .then((_) => res.status(204).send("Usuário atualizado com sucesso"))
      .catch((err) => res.status(500).send(err));
  };

  const getAdmins = async (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .where({ admin: !null && !false })
      .then((users) => res.status(204).send(users))
      .catch((err) => res.status(500).send(err));
  };

  return { save, get, remove, update, alterPassword, getAdmins };
};
