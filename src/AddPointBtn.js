import { useDispatch } from "react-redux"
import { pointScored } from "./store"

export default function AddPointBtn({player}) {
    const dispatch = useDispatch()
    
    return (
        <button
            className="button"
            onClick={() => dispatch(pointScored(player))}
        >Point Joueur {player[player.length - 1]}</button>
    )
}