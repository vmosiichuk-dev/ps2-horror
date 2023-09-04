import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/app/app";
import IGDB from "./services/IGDB";

const iGDB = new IGDB();
let allGames = [];

iGDB.getToken()
	.then(res => iGDB.getGames(res.access_token))
	.then(res => {
		console.log(res);
		res.forEach(game => {
			game["title"] = game["name"];
			game["rating"] = game["total_rating"];
			delete game["name"];
			delete game["total_rating"];

			const filters = {wish: false, play: false};
			const gameData = Object.assign(filters, game);

			allGames.push(gameData);
		});
		console.log(allGames);
	});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<App allGames={allGames}/>
);