export const fetchGames = async (query: string) => {
    const search = `search "${query}"`;
    const fields = 'fields name,cover.url,first_release_date,summary,rating';
    const limit = 'limit 10';

    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/igdb/games`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: `${search};${fields};${limit};`,
        }
    );

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
};
