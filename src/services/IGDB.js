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

    getGames = (token) => {
        const gamesURL = proxyURL + this._apiBase + "/games"
        const data = {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Client-ID": clientID,
                "Authorization": "Bearer " + token
            },
            body: "fields genres.name, name, total_rating, rating, aggregated_rating, cover.image_id, first_release_date, involved_companies.developer, involved_companies.company.name, screenshots.image_id, slug, summary, websites.category, websites.url; limit 88; where platforms = (8) & genres != (4,10,16,34) & themes = (19,21) & themes != (35,39) & keywords != (5340) & player_perspectives != (4,5) & franchises != (463,824) & id != (3837,2862,6200,5143,2861,210296,43614,11286,5868,43262,43264,20829,1159,43301,253324,85965,172551,91643,43633,43210,49405,132163,136,260797,77219,127959,20640,37045,144966,203260,13901,24096,64108,72157,73012); sort total_rating desc;"
		}
        return this.getResource(gamesURL, data)
    }
}

export default IGDB