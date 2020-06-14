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

  app
    .route("/enrollments")
    .all(app.config.passport.authenticate())
    .post(app.api.enrollment.save)
    .get(app.api.enrollment.get);

  app
    .route("/enrollments/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.enrollment.save)
    .delete(app.api.enrollment.remove)
    .get(app.api.enrollment.get);

  app
    .route("/enrollments/:myCourses/myCourses")
    .all(app.config.passport.authenticate())
    .get(app.api.enrollment.getMyCourses);

  app
    .route("/modules")
    .all(app.config.passport.authenticate())
    .post(app.api.modules.save)
    .get(app.api.modules.get);

  app
    .route("/modules/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.modules.save)
    .delete(app.api.modules.remove)
    .get(app.api.modules.get);

  app
    .route("/modules/:idCourse/course")
    .all(app.config.passport.authenticate())
    .get(app.api.modules.getModulesCourse);
};
