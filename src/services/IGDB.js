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
            body: "fields cover,name,total_rating; limit 80; where platforms = 8 & themes = (19,21);"
        }

        return this.getResource(gamesURL, data);
    }
}

export default IGDB;