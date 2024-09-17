const setupRoutes = (app, db) => {
    // voir tout nos articles
    app.get('/articles', (req, res) => {
        db.all('SELECT * FROM articles', [], (err, rows) => {
            if (err) {
                res.status(500).send(err.message)
            } else {
                res.json(rows);
            }
        });
    });

    // voir selon son id
    app.get('/articles/:id', (req, res) => {
        const { id } = req.params;
        db.get('SELECT * FROM articles WHERE id = ?', [id], (err, row) => {
            if (err) {
                res.status(500).send(err.message);
            } else if (row) {
                res.json(row);
            } else {
                res.status(404).send('Article introuvable');
            }
        });
    });

    // supprimer un article selon son id
    app.delete('/articles/:id', (req, res) => {
        const { id } = req.params;
        console.log(id);
        db.run('DELETE FROM articles WHERE id = ?', [id], function(err) {
            if (err) {
                res.status(500).send(err.message);
            } else if (this.changes > 0) {
                res.status(200).send(`L'article avec l'id n°${id} a bien été supprimé.`);
            } else {
                res.status(404).send('Article introuvable');
            }
        });
    });
    
    
};

module.exports = setupRoutes;