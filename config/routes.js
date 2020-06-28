const multer = require("multer");

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
    .route("/user/:id/changePassword")
    .all(app.config.passport.authenticate())
    .put(app.api.users.alterPassword);

  app
    .route("/admins")
    .all(app.config.passport.authenticate())
    .get(app.api.users.getAdmins);

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

  app
    .route("/classes")
    .all(app.config.passport.authenticate())
    .post(app.api.classes.save)
    .get(app.api.classes.get);

  app
    .route("/classes/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.classes.save)
    .delete(app.api.classes.remove)
    .get(app.api.classes.get);

  app
    .route("/classes/:module/module")
    .all(app.config.passport.authenticate())
    .get(app.api.classes.getClassesModule);

  app
    .route("/upload")
    .all(app.config.passport.authenticate())
    .post(app.api.classes.uploadVideo);

  app.route("/video/:video").get(app.api.classes.getVideo);

  app
    .route("/warnings")
    .all(app.config.passport.authenticate())
    .post(app.api.warnings.save)
    .get(app.api.warnings.get);

  app
    .route("/warnings/:id")
    .all(app.config.passport.authenticate())
    .put(app.api.warnings.save)
    .delete(app.api.warnings.remove)
    .get(app.api.warnings.get);

  app
    .route("/warnings/:course/course")
    .all(app.config.passport.authenticate())
    .get(app.api.warnings.getWarningCourse);

  app
    .route("/support")
    .all(app.config.passport.authenticate())
    .post(app.api.support.sendMail);
};
