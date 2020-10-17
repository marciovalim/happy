const openDatabase = require("./database/database.js");

module.exports = {
  index(_, response) {
    return response.render("index");
  },
  async orphanage(request, response) {
    try {
      return await _sendOrphanagePage(request, response);
    } catch (error) {
      return _sendDatabaseError(response);
    }
  },
  async orphanages(_, response) {
    try {
      return await _sendOrphanagesPage(response);
    } catch (error) {
      return _sendDatabaseError(response);
    }
  },
  createOrphanage(_, response) {
    return response.render("create_orphanage");
  },
  async saveOrphanage(request, response) {
    const fields = request.body;
    try {
      const database = await openDatabase();
      await database.addOrphanage({
        name: fields.name,
        lat: fields.lat,
        lng: fields.lng,
        whatsapp: fields.whatsapp,
        description: fields.description,
        instructions: fields.instructions,
        images: fields.images,
        openingHours: fields.openingHours,
        openOnWeekends: fields.openOnWeekends,
      });
      return response.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      return _sendDatabaseError(response);
    }
  },
};

async function _sendOrphanagePage(request, response) {
  const database = await openDatabase();
  const orphanage = await database.getOrphanageById(request.query.id);
  orphanage.firstImage = orphanage.images[0];
  orphanage.openOnWeekends = orphanage.openOnWeekends == "1";
  orphanage.whatsappFirstMessage = `Oi, quero visitar o orfanato ${orphanage.name}.`;
  return response.render("orphanage", { orphanage });
}

async function _sendOrphanagesPage(response) {
  const database = await openDatabase();
  const orphanages = await database.getAllOrphanages();
  return response.render("orphanages", { orphanages });
}

function _sendDatabaseError(response) {
  return response.send("Something bad occurred. Error in database.");
}
