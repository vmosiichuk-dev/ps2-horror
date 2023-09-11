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
            body: "fields keywords, genres, franchises, name, total_rating, cover.image_id; limit 299; where platforms = (8) & genres != (4,10,16,34) & themes = (19,21) & themes != 21 &themes != (27,35,39) & keywords != (5340) & player_perspectives != (4,5) & franchises != (463,824) & id != (11286,5868,43262,43264,20829,1159,43301,253324,85965,172551,91643,73012,72157,43633,43210,49405,132163,136,260797,77219,127959); sort total_rating desc;"
/*             body: "fields name, total_rating, cover.image_id; limit 299; where platforms = (8) & themes = (19,21) & themes != 21 &themes != (27,35,39) & player_perspectives != (4,5) & franchises != (463,361,834) & total_rating != null & id != (22252,69721,13901,3945,1159,20640,281,1137,20545,22066,20829,24096,11757,5845,971,19629); sort total_rating desc;"


 */        }

        return this.getResource(gamesURL, data)
    }
}

export default IGDB