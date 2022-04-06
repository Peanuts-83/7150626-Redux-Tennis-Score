// Selector to get number of games won by player
export const getWonGames = (player) => {
    return state => state.history.filter(game => game.winner === player)
}

// Selector to get Player's score
export const getScore = (player) => {
    return state => state[player]
}