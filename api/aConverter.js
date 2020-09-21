const ffmpeg = require("ffmpeg");
const fs = require("fs");

module.exports = (app) => {
  const renderOne = (path, filename, hash) => {
    try {
      const process = new ffmpeg(path);
      process.then(function (video) {
        console.log("Processando video 854x480");
        video
          .setVideoSize("854x480", true, false)
          .setAudioChannels(2)
          .save(`public/videos/420p/${filename}-854x480.mp4`, function (
            error,
            file
          ) {
            if (!error) {
              const newInfo = {
                sd: file,
              };

              app
                .db("videos")
                .update(newInfo)
                .where({ hash: hash })
                .then(console.log("sucesso"));

              console.log("Resolução 426x240 Sucesso: " + file);
            } else {
              const newInfo = {
                process: false,
                error: true,
              };

              app
                .db("videos")
                .update(newInfo)
                .where({ hash: hash })
                .then(console.log("O processamento parou"));
              console.log("Error: " + error);
            }
          });
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
    }
  };

  const renderTwo = (path, filename, hash) => {
    try {
      const process = new ffmpeg(path);
      process.then(function (video) {
        console.log("Processando video 1280x720");
        video
          .setVideoSize("1280x720", true, false)
          .setAudioChannels(2)
          .save(`public/videos/720p/${filename}-1280x720.mp4`, function (
            error,
            file
          ) {
            if (!error) {
              const newInfo = {
                hd: file,
              };

              app
                .db("videos")
                .update(newInfo)
                .where({ hash: hash })
                .then(console.log("sucesso"));
              console.log("Resolução 1280x720 Sucesso: " + file);
            } else {
              const newInfo = {
                process: false,
                error: true,
              };

              app
                .db("videos")
                .update(newInfo)
                .where({ hash: hash })
                .then(console.log("O processamento parou"));
              console.log("Error: " + error);
            }
          });
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
    }
  };

  const renderThree = (path, filename, hash) => {
    try {
      const process = new ffmpeg(path);
      process.then(function (video) {
        console.log("Processando video 1920x1080");
        video
          .setVideoSize("1920x1080", true, false)
          .setAudioChannels(2)
          .save(`public/videos/1080p/${filename}-1920x1080.mp4`, function (
            error,
            file
          ) {
            if (!error) {
              const newInfo = {
                process: false,
                fullHD: file,
              };

              app
                .db("videos")
                .update(newInfo)
                .where({ hash: hash })
                .then(console.log("sucesso"));

              console.log("Resolução 1920x1080 Sucesso: " + file);
              fs.unlink(path, function (err) {
                if (!err) {
                  console.log("Arquivo apagado!");
                } else {
                  console.log(err);
                }
              });
            } else {
              const newInfo = {
                process: false,
                error: true,
              };

              app
                .db("videos")
                .update(newInfo)
                .where({ hash: hash })
                .then(console.log("O processamento parou"));
              console.log("Error: " + error);
            }
          });
      });
    } catch (e) {
      console.log(e.code);
      console.log(e.msg);
    }
  };

  return { renderOne, renderTwo, renderThree };
};
