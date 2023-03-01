const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

Band.hasMany(Musician);
Musician.belongsTo(Band);
Band.hasMany(Song);
Song.belongsToMany(Band, {through: 'BandSong'});

module.exports = {
    Band,
    Musician,
    Song
};
