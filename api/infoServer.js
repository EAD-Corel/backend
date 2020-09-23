const os = require("os-utils");
const diskspace = require("diskspace");
const memoryInfo = require("os");

module.exports = (app) => {
  const total = os.totalmem();
  const free = os.freemem();

  const memory = {
    free,
    total,
  };

  const getInfosServer = (req, res) => {
    os.cpuUsage(function (cpu) {
      diskspace.check("/", function (err, disk) {
        res.json({ cpu, disk, memory });
      });
    });
  };

  return { getInfosServer };
};
