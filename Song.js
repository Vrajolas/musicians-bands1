const {Sequelize, sequelize} = require('./db');

let Song = sequelize.define("Song", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = {
    Song
};