import { useSelector } from "react-redux"


export default function Display() {
    const state = useSelector(state => state)

    if (state.winner) {
        return (<p className="display" id="score">{state.winner} a gagné!</p>)
    } else if (!state.playing) {
        return (<p className="display" id="score">Pause...</p>)
    } else {
        let text = `Le score est: ${state.player1} - ${state.player2} \n`

        if (state.advantage) {
            text += state.advantage === 'player1' ? 'avantage player 1' : 'avantage player 2'
        }
        return (<p className="display" id="score">{text}</p>)

    }
}