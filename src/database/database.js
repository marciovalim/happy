const sqlite = require("sqlite-async");
const path = require("path");

module.exports = async function openDatabase() {
  const database = new Database();
  await database._init();
  return database;
};

class Database {
  constructor() {
    this.sqliteDatabase = null;
    this.orphanagesTableName = "orphanages";
  }

  async _init() {
    this.sqliteDatabase = await this._openDatabase();
    await this._createOrphanagesTableIfNotExists();
  }

  async addOrphanage({
    name,
    lat,
    lng,
    whatsapp,
    description,
    instructions,
    images,
    openingHours,
    openOnWeekends,
  }) {
    await this.sqliteDatabase.run(`
        INSERT INTO ${this.orphanagesTableName} (
            name,
            lat, 
            lng,
            whatsapp,
            description, 
            instructions,
            images,
            openingHours, 
            openOnWeekends
        ) VALUES (
            "${name}",
            "${lat}",
            "${lng}",
            "${whatsapp}",
            "${description}",
            "${instructions}",
            "${images.toString()}",
            "${openingHours}",
            "${openOnWeekends}"
        );
    `);
  }

  async getAllOrphanages() {
    const allSqliteOrphanages = await this.sqliteDatabase.all(
      `SELECT * FROM ${this.orphanagesTableName};`
    );
    return allSqliteOrphanages.map((sqliteOrphanage) => {
      return this._convertSqliteOrphanateToJavascriptOrphanage(sqliteOrphanage);
    });
  }

  async getOrphanageById(id) {
    const queryResult = await this.sqliteDatabase.all(
      `SELECT * FROM ${this.orphanagesTableName} WHERE id = "${id}";`
    );
    if (queryResult.length == 0) return;
    const sqliteOrphanage = queryResult[0];
    return this._convertSqliteOrphanateToJavascriptOrphanage(sqliteOrphanage);
  }

  _convertSqliteOrphanateToJavascriptOrphanage(sqliteOrphanage) {
    sqliteOrphanage.images = sqliteOrphanage.images.split(",");
    return sqliteOrphanage;
  }

  async deleteAllOrphanages() {
    await this.sqliteDatabase.run(`DELETE FROM ${this.orphanagesTableName}`);
  }

  async _openDatabase() {
    return await sqlite.open(this._getDatabasePath());
  }

  _getDatabasePath() {
    return path.join(__dirname, "database.sqlite");
  }

  async _createOrphanagesTableIfNotExists() {
    await this.sqliteDatabase.exec(`
        CREATE TABLE IF NOT EXISTS ${this.orphanagesTableName} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            lat TEXT,
            lng TEXT,
            whatsapp TEXT,
            description TEXT,
            instructions TEXT,
            images TEXT,
            openingHours TEXT,
            openOnWeekends TEXT
        );
    `);
  }
}
