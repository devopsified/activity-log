const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rajashree:Canada@2019@cluster0.ygnxa.mongodb.net/test?retryWrites=true&w=majority";
let db = {};

module.exports = {
    /**
     * @description Creates and persists the database connection of the requested resource
     * @public
     * @param {String} dbName Database Name
     * @returns Promise
     * @author Rajashree
     */
    connectToDatabase: function (dbName) {
        return MongoClient.connect(uri, { useUnifiedTopology: true })
            .then((client) => {
                db[dbName] = client.db(dbName);
                return db[dbName];
            })
            .catch(console.error);
    },

    /**
     * @description Returns the database instance for the requested database
     * @public
     * @param {String} dbName Database name
     * @returns Database instance or undefined
     * @author Rajashree
     */
    getDBInstance: function (dbName) {
        return db[dbName];
    }
};
