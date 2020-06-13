const bcrypt = require('bcrypt');

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
      existsOrError(user.name, 'Nome não informado');
      existsOrError(user.email, 'E-mail não informado');
      existsOrError(user.password, 'Senha não informada');
      existsOrError(user.confirmPassword, 'Confirmação de senha inválida');
      equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem');

      const userFromDB = await app
        .db('users')
        .where({ email: user.email })
        .first()

      if (!user.id) {
        notExistsOrError(userFromDB, 'Usuário já cadastrado');
      };
    } catch (msg) {
      return res.status(400).msg(msg);
    };

    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db('users')
        .update(user)
        .where({ id: user.id })
        .then((_) => res.status(204).send('Usuário atualizado com sucesso'))
    } else {
      app
        .db('users')
        .insert(user)
        .then((_) => res.status(204).send('Usuário adicionado com sucesso'))
        .catch((err) => res.status(500).send(err))
    }
  };

  const get = (req, res) => {
    if (req.params.userId) {
      app
        .db('users')
        .select('id', 'name', 'email')
        .where({ id: req.params.userId })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).send(err));
    };

    app
      .db('users')
      .select('id', 'name', 'email')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err))
  };

  const remove = async (req, res) => {
    try {
      const rowsDeleted = await app
        .db('users')
        .where({ id: req.params.id })
        .del()

      try {
        existsOrError(rowsDeleted, 'Usuário não foi encontrado');
      } catch(msg) {
        return res.status(400).send(msg);
      }

      res.status(400).send('Delete com sucesso');
    } catch(msg) {
      res.status(500).send(msg);
    }
  };

  return { save, get, remove };
};