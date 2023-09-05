const clientID = process.env.REACT_APP_CLIENT_ID;  
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

class IGDB {
    _proxyURL = "https://agile-brushlands-68863-312c51a06b31.herokuapp.com/";
    _apiBase = "https://api.igdb.com/v4";

    getResource = async (url, data) => {
        let res = await fetch(url, data);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        
        return await res.json();
    }

    getToken = () => {
        const tokenUrl = "https://id.twitch.tv/oauth2/token";
        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "client_id=" + clientID + "&client_secret=" + clientSecret + "&grant_type=client_credentials"
        }

        return this.getResource(tokenUrl, data);
    }

    getGames = (token) => {
        const gamesURL = this._proxyURL + this._apiBase + "/games";
        const data = {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Client-ID": clientID,
                "Authorization": "Bearer " + token
            },
            body: "fields name, total_rating, cover.image_id; limit 299; where platforms = (8) & themes = (19,21) & themes != 21 &themes != (27,35,39) & player_perspectives != (4,5) & franchises != (463,361) & total_rating != null & id != (22252,69721,13901,3945,1159,20640,281,1137,20545,181961,20829); sort total_rating desc;"
        }

        return this.getResource(gamesURL, data);
    }
}

export default IGDB;