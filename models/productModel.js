const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        db.query('SELECT * FROM products', callback);

    },

    getById: (id, callback) => {
        db.query('SELECT * FROM products WHERE id = ?', [id], callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?, ?, ?)', [data.name, data.price, data.kode, data.is_ready, data.image, data.rak], callback);
    },

    update: (id, data, callback) => {
        db.query(
            'UPDATE products SET kode =? , nama=? , harga =? , is_ready =? , image =? , rak =? WHERE id = ?',
            [data.kode, data.nama, data.harga, data.is_ready, data.image, data.rak, id],
        );
    },
    remove: (id, callback) => {
        db.query('DELETE FROM products WHERE id = ?', [id], callback);
    }
};

module.exports = Product;