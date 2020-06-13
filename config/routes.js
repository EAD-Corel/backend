module.exports = (app) => {
  app.post("/sessions", app.api.auth.session);
  app.post("/validateToken", app.api.auth.validateToken);

  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .post(app.api.users.save)
    .get(app.api.users.get);

  app
    .route("/users/:userId")
    .all(app.config.passport.authenticate())
    .get(app.api.users.get);

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.users.update)
    .delete(app.api.users.remove);

  app
    .route("/courses")
    .all(app.config.passport.authenticate())
    .post(app.api.courses.save)
    .get(app.api.courses.get);

  app
    .route("/courses/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.courses.save)
    .delete(app.api.courses.remove)
    .get(app.api.courses.get);
};
