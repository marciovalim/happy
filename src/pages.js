const orphanagesData = require("./database/fakedata");

module.exports = {
  index(_, response) {
    return response.render("index");
  },
  orphanage(_, response) {
    return response.render("orphanage");
  },
  orphanages(_, response) {
    return response.render("orphanages", { orphanages: orphanagesData });
  },
  createOrphanage(_, response) {
    return response.render("createOrphanage");
  },
};
