const REQUEST = {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain',
        'X-Requested-With': 'XMLHttpRequest'
    }
};

// const getWhereIdQuery = (ids: number[]) => {
//     if (!Array.isArray(ids) || ids.length === 0) return '';
//     return `where id = (${ids.join(',')});`;
// };

export const fetchGames = async (body: string) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/igdb/games`;

    const response = await fetch(url, {...REQUEST, body});
    if (!response.ok) console.error(`Error: ${response.status}`);

    return await response.json();
};

// export const fetchAgeRatings = async (ids: number[]) => {
//     const url = `${import.meta.env.VITE_API_BASE_URL}/igdb/age_ratings`;
//     const body = `fields organization,rating_category; ${getWhereIdQuery(ids)}`.trim();
//
//     const response  = await fetch(url, {...REQUEST, body});
//     if (!response.ok) console.error(`Error: ${response.status}`);
//
//     return await response.json();
// };
