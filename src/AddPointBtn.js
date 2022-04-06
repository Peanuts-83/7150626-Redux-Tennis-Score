import { useDispatch, useSelector } from "react-redux"
import { pointScored } from "./store"
import { getScore } from "./selectors"

export default function AddPointBtn({ player }) {
    const dispatch = useDispatch()
    const score = useSelector(getScore(player))
    const other = player === 'player1' ? 'player2' : 'player1'
    const otherScore = useSelector(getScore(other))
    const advantage = useSelector(state => state.advantage)

    return (
        <button
            className="button"
            onClick={() => dispatch(pointScored(player))}
        >Point Joueur {player[player.length - 1]}
            <br /> {rounds(score, otherScore, player, advantage)} rounds to win
        </button>
    )
}

function rounds(score, otherScore, player, advantage) {
    switch (score) {
        case 15:
            return 3
        case 30:
            return 2
        case 40:
            if (otherScore < 40) {
                return 1
            } else {
                return advantage === player ? 1 : 2
            }
        default:
            return 4
    }
}