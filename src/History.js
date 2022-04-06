import { useSelector } from "react-redux"

export default function History() {
    const history = useSelector(state => state.history)
    const player1Games = history.filter(game => game.winner === 'player1').length
    const player2Games = history.filter(game => game.winner === 'player2').length

    return(
        <p className="history">Jeux P1: {player1Games} - Jeux P2: {player2Games}</p>
    )
}