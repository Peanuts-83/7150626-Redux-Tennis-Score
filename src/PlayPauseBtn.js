import { useStore } from "react-redux"
import { autoplay } from "./store"

export default function PlayPauseBtn() {
    const store = useStore()
    return (
        <button
            className="button"
            onClick={() => autoplay(store) }
        > Lancer le jeu</button >
    )
}