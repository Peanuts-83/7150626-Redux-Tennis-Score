import { useSelector } from "react-redux"
import { getWonGames } from "./selectors"


export default function PlayerPoint({playerId, playerName}) {
    const playerGames = useSelector(getWonGames(playerId)).length

    return(
        <p className="player-games">
            <span>{playerName}</span>
            <span>{playerGames}
            {playerGames <= 1 ? <span> jeu gagné</span> : <span> jeux gagnés</span>}
            </span>
        </p>
    )
}