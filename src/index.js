import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./components/app"
import IGDB from "./services/IGDB"
import Welcome from "./components/welcome"

const iGDB = new IGDB()
let allGames = []

iGDB.getToken()
	.then(res => iGDB.getGames(res.access_token))
	.then(res => {
		console.log(res)
		res.forEach(game => {
			let rating = "N/A"
			if (game.total_rating) {
				rating = Math.round(game.total_rating)
			} else if (game.rating) {
				rating = Math.round(game.rating)
			} else if (game.aggregated_rating) {
				rating = Math.round(game.aggregated_rating)
			}
			const src = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover.image_id + ".jpg"
			const gameData = {rating: rating, title: game.name, src: src}

			const filters = {wish: false, play: false}
			const gameFiltered = Object.assign(filters, gameData)

			allGames.push(gameFiltered)
		})
		console.log(allGames)
	})

const root = ReactDOM.createRoot(document.getElementById('root'))
const RootContent = () => {
    return <>
		<App allGames={allGames}/>
		<Welcome />
    </>
}

root.render(
    <RootContent />
)