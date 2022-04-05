import { useDispatch } from "react-redux"
import { restartGame } from "./store"

export default function RestartBtn() {
    const dispatch = useDispatch()
    return(
        <button
            className="button"
            onClick={() => dispatch(restartGame())}>Remettre à zéro</button>
    )
}