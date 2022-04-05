import { useDispatch } from "react-redux"
import { playPause } from "./store"

export default function PlayPauseBtn() {
    const dispatch = useDispatch()
    return(
        <button
            className="button"
            onClick={() => dispatch(playPause())}
        >Pause / Reprendre</button>
    )
}