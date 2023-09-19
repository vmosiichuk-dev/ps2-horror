const proxyURL = process.env.REACT_APP_PROXY_URL,
      clientID = process.env.REACT_APP_CLIENT_ID,
      clientSecret = process.env.REACT_APP_CLIENT_SECRET

class IGDB {
    _apiBase = "https://api.igdb.com/v4"

    getResource = async (url, data) => {
        let res = await fetch(url, data)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        
        return await res.json()
    }

    getToken = () => {
        const tokenUrl = "https://id.twitch.tv/oauth2/token"
        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "client_id=" + clientID + "&client_secret=" + clientSecret + "&grant_type=client_credentials"
        }

        return this.getResource(tokenUrl, data)
    }

    getGames = (token) => {
        const gamesURL = proxyURL + this._apiBase + "/games"
        const data = {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Client-ID": clientID,
                "Authorization": "Bearer " + token
            },
            body: "fields genres.name, name, total_rating, rating, aggregated_rating, cover.image_id, age_ratings.rating_cover_url, involved_companies.developer, involved_companies.company.name, screenshots.image_id, slug, summary, url, websites.category, websites.url; limit 299; where platforms = (8) & genres != (4,10,16,34) & themes = (19,21) & themes != 21 &themes != (27,35,39) & keywords != (5340) & player_perspectives != (4,5) & franchises != (463,824) & id != (11286,5868,43262,43264,20829,1159,43301,253324,85965,172551,91643,73012,72157,43633,43210,49405,132163,136,260797,77219,127959,20640,37045,144966,203260,13901,24096); sort total_rating desc;"
/*             body: "fields keywords, genres, franchises, name, total_rating, cover.image_id; limit 299; where platforms = (8) & genres != (4,10,16,34) & themes = (19,21) & themes != 21 &themes != (27,35,39) & keywords != (5340) & player_perspectives != (4,5) & franchises != (463,824) & id != (11286,5868,43262,43264,20829,1159,43301,253324,85965,172551,91643,73012,72157,43633,43210,49405,132163,136,260797,77219,127959); sort total_rating desc;"


 */        }

        return this.getResource(gamesURL, data)
    }
}

export default IGDB

/* 
                let genres = game.genres,
                    involvedCompanies = game.involved_companies
                    // ageRatings = [],

                    let screenshot,
                    rating = "N/A",
                    developer = "",
                    newGenres = []
                    // newAgeRatings = [],

                if (game.total_rating) {
                    rating = Math.round(game.total_rating)
                } else if (game.rating) {
                    rating = Math.round(game.rating)
                } else if (game.aggregated_rating) {
                    rating = Math.round(game.aggregated_rating)
                }

                if (genres !== undefined) {
                    genres.forEach(item => newGenres.push(item.name))
                }

                if (involvedCompanies !== undefined) {
                    involvedCompanies.forEach(item => {
                        if (item.developer) {
                            developer = item.name
                        }
                    })
                }

                game.screenshots !== undefined 
                    ? screenshot = "https://images.igdb.com/igdb/image/upload/t_screenshot_big/" + game.screenshots[0].image_id + ".jpg" 
                    : screenshot = "" 
                // game.age_ratings.forEach(item => ageRatings.push(item.rating_cover_url)) 

                const src = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover.image_id + ".jpg", 
                      filters = { wish: false, play: false },
                      gameData = { ...game, 
                                   src: src, 
                                   rating: rating, 
                                   title: game.name, 
                                   screenshot: screenshot, 
                                   // ageRatings: ageRatings, 
                                   genres: genres,
                                   developer: developer }

                delete gameData.cover
                delete gameData.total_rating
                delete gameData.rating
                delete gameData.aggregated_rating
                delete gameData.name
                delete gameData.screenshots
                delete gameData.genres
                delete gameData.involved_companies
                // delete game.age_ratings

                const gameFiltered = Object.assign(filters, gameData)
                if (gameFiltered.rating === "N/A") {
                    notRatedGames.push(gameFiltered)
                } else {
                    ratedGames.push(gameFiltered)
                }
            })
            const allGames = [...ratedGames, ...notRatedGames]
            console.log(allGames[0])
            this.setState({ data: allGames, apiDataLoaded: true })









{
    "wish": false,
    "play": false,
    "id": 481,
    "age_ratings": [
      {
        "id": 6457
      },
      {
        "id": 21416
      }
    ],
    "cover": {
      "id": 134728
    },
    "genres": [
      {
        "id": 9,
        "name": "Puzzle"
      },
      {
        "id": 31,
        "name": "Adventure"
      }
    ],
    "involved_companies": [
      {
        "id": 99380,
        "company": {
          "id": 10446,
          "name": "Team Silent"
        }
      },
      {
        "id": 99381,
        "company": {
          "id": 129,
          "name": "Konami"
        }
      }
    ],
    "screenshots": [
      {
        "id": 384953,
        "image_id": "sc8915"
      },
      {
        "id": 384954,
        "image_id": "sc8916"
      },
      {
        "id": 384955,
        "image_id": "sc8917"
      },
      {
        "id": 384957,
        "image_id": "sc8919"
      },
      {
        "id": 384958,
        "image_id": "sc891a"
      },
      {
        "id": 384959,
        "image_id": "sc891b"
      }
    ],
    "slug": "silent-hill-2",
    "summary": "The second entry in the Silent Hill franchise, Silent Hill 2 is a narrative-focused third-person psychological horror game with exploration and puzzle-solving elements which follows James Sunderland, a man who receives a letter, seemingly sent by his three-years-deceased wife Mary, in which he is beckoned to the fog-ridden town of Silent Hill at the same time as numerous other people troubled by their past.",
    "url": "https://www.igdb.com/games/silent-hill-2",
    "websites": [
      {
        "id": 77440,
        "url": "https://en.wikipedia.org/wiki/Silent_Hill_2"
      },
      {
        "id": 333432,
        "url": "https://www.twitch.tv/directory/game/Silent%20Hill%202"
      }
    ],
    "rating": 91,
    "title": "Silent Hill 2",
    "src": "https://images.igdb.com/igdb/image/upload/t_cover_big/co2vyg.jpg"
  } */