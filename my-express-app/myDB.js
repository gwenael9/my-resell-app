const sqlite3 = require('sqlite3').verbose();

const initializeDatabase = () => {
    const db = new sqlite3.Database('./mydb.sqlite3', (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connecté à sqlite");
        }
    });

    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, categorie TEXT NOT NULL)');

        const stmt = db.prepare('INSERT OR IGNORE INTO articles (name, description, categorie) VALUES (?, ?, ?)');

        stmt.run("Ordinateur", "Ma 1ere description", "Informatique");
        stmt.run("Voiture", "Ma 2e description", "Véhicule");
        stmt.run("Clavier", "Ma 3e description", "Informatique");

        stmt.finalize();
    });

    return db;
};

module.exports = initializeDatabase;