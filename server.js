const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()


const schema = buildSchema(`
type About {
    message: String!
}
type Meal {
    description: String!
}
type Pet {
    name: String! 
    species: String!
}
type Song {
    title: String! 
    artist: String!
    genre: String!
}
type Time {
    hour: Int 
    minute: Int 
    second: Int
}
type Query {
    getAbout: About
    getMeal(time: String!): Meal
    getPet(id: Int): Pet
    allPets: [Pet!]!
    getSong(id: Int): Song
    allSongs: [Song!]!
    firstSong: Song
    lastSong: Song
    getTime: Time
    getRandom(range: Int): Int
}
`)

const petList = [ { name: 'Fluffy', species: 'Dog' }, { name: 'Sassy', species: 'Cat' }, { name: 'Goldberg', species: 'Frog' } ]
const songList= [ { title: 'Kiss Me More', artist: 'Doja Cat', genre: 'Pop' }, { title: 'To Me', artist: 'Alina Baraz', genre: 'R&B'}, { title: 'Put It Down', artist: 'Jazmine Sullivan', genre: 'Soul' } ]

const root = {
    getAbout: () => {
      return { message: 'Hello World' }
    },
        getMeal: ({time}) => {
            const allMeals = { 'breakfast': 'toast', 'lunch': 'noodles', 'dinner': 'pizza' }
            const meals = allMeals[time]
            return { description: meals}
        }, 
            getPet: ({ id }) => {
                return petList[id]
            }, 
            allPets: () => {
                return petList
            }, 
                getSong: ({ id }) => {
                    return songList[id]
                },
                allSongs: () => {
                    return songList
                },
                firstSong: () => {
                    return songList[0]
                },
                lastSong: () => {
                    return songList[songList.length - 1 ]
                },
                    getTime: () => {
                        let today = new Date()
                        let hour = today.getHours()
                        let minute = today.getMinutes()
                        let second = today.getSeconds()
                        return {hour, minute, second}
                    },
                        getRandom( {range }) {
                            // return random number between 1 & 100
                        }
}

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

const port = 4000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})