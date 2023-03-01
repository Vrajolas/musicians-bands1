const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        const band = await Band.create({
            name: 'The Beatles',
            genre: 'Rock'
        });

        expect(band.name).toBe('The Beatles');
        expect(band.genre).toBe('Rock');
    })

    test('can create a Musician', async () => {
        const musician = await Musician.create({
            name: 'John Lennon',
            instrument: 'Guitar'
        });

        expect(musician.name).toBe('John Lennon');
        expect(musician.instrument).toBe('Guitar');
    })

    test('can add musicians to a band', async () => {
        const band = await Band.create({
          name: 'The Beatles',
          genre: 'Rock',
        });
    
        const musician1 = await Musician.create({
          name: 'John Lennon',
          instrument: 'Guitar',
        });

        const musician2 = await Musician.create({
          name: 'George Harrison',
          instrument: 'Guitar',
        });

        await band.addMusicians([musician1, musician2])

        const bands = await Band.findAll();
        expect(band.length).toBe(1);

        const foundBand = bands[0];
        const musicians = await foundBand.getMusicians();
        expect(musicians.length).toBe(4);
        expect(musicians.map((m) => m.name)).toEqual([
            'John Lennon',
            'George Harrison'
        ])
    })
})