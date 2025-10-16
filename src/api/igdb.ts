export const fetchGames = async (body: string) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/igdb/games`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body
        }
    );

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
};
