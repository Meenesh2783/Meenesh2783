const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'moviesData.db')

const app = express()

app.use(express.json())

let db = null

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log(`Server Running at http://localhost:3000/`)
    })
  } catch (e) {
    console.log(`db: error${e.message}`)
    process.exit(1)
  }
}

initializeDbAndServer()

const convertDbObjectToResponseObject = dbObject => {
  return {
    movieId: dbObject.movie_id,
    directorId: dbObject.director_id,
    movieName: dbObject.movie_name,
    leadActor: dbObject.lead_actor,
    directorName: dbObject.director_name,
  }
}

app.get('/movies/', async (request, response) => {
  const getPlayerQuery = `
      SELECT * 
      FROM movie`
  const movieArray = await ad.all(getPlayerQuery)
  response.send(
    movieArray.map(eachitem => convertDbObjectToResponseObject(eachitem)),
  )
})

app.post('/movies/', async (request, response) => {
  const {directorId, movieName, leadActor} = request.body
  const postMovieQuery = `
      INSERT INTO `
})
