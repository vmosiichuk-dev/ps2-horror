const proxyURL = process.env.REACT_APP_PROXY_URL,
      clientID = process.env.REACT_APP_CLIENT_ID,
      clientSecret = process.env.REACT_APP_CLIENT_SECRET

class IGDB {
    _apiBase = "https://api.igdb.com/v4"

    getResource = async (url, data) => {
        let res = await fetch(url, data)
        if (!res.ok) throw new Error(`Could not fetch ${url}, status: ${res.status}`)
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

    getGames = (token, body) => {
        const gamesURL = proxyURL + this._apiBase + "/games"
        const data = {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Client-ID": clientID,
                "Authorization": "Bearer " + token
            },
            body: body
		}
        return this.getResource(gamesURL, data)
    }
}

export default IGDB