import { createStore } from "redux";
import produce from 'immer'

// state
const initialState = {
    player1: 0,
    player2: 0,
    advantage: null,
    winner: null,
    playing: false,
    history: [],
};

// actions creators
export const setPlaying = (playing) => ({
    type: "setPlaying",
    payload: {playing: playing}
});

export const restartGame = () => ({ type: "restart" });

export const pointScored = (player) => ({
    type: "pointScored",
    payload: { player: player },
});

export const autoplay = (store) => {
    const isPlaying = store.getState().playing
    if (isPlaying) {
        console.log('isPlaying!')
        return
    }
    store.dispatch(setPlaying(true))
    const intervalPlayer = window.setInterval(() => {
        if (store.getState().playing === false) {
            return
        }
        if (store.getState().winner) {
            clearInterval(intervalPlayer)
            store.dispatch(setPlaying(false))
            return
        }
        const pointWinner = Math.random() > .5 ? 'player1' : 'player2'
        store.dispatch(pointScored(pointWinner))
    }, 1000)
}


function reducer(state = initialState, action) {
    if (action.type === "restart") {
        return produce(state, draft => {
            if (draft.winner) {
                draft.history.push({
                    player1: draft.player1,
                    player2: draft.player2,
                    winner: draft.winner
                })
            }
            draft.player1 = 0
            draft.player2 = 0
            draft.advantage = null
            draft.winner = null
            draft.playing = false
        })
    }

    if (action.type === "setPlaying") {
        if (state.winner) {
            return state;
        }
        return produce(state, draft => { draft.playing = action.payload.playing })
    }

    if (action.type === "pointScored") {
        const player = action.payload.player;
        const otherPlayer = player === "player1" ? "player2" : "player1";
        if (state.winner) {
            return produce(state, draft => {
                draft.history.push({
                    player1: draft.player1,
                    player2: draft.player2,
                    winner: draft.winner
                })
                draft.player1 = 0
                draft.player2 = 0
                draft.advantage = null
                draft.winner = null
                draft.playing = true
            })
        }
        if (state.playing === false) {
            // On ne peut pas marquer de point si le set est en pause
            return state;
        }
        const currentPlayerScore = state[player];
        if (currentPlayerScore <= 15) {
            // 0 ou 15 => on ajoute 15
            return produce(state, draft => { draft[player] = draft[player] + 15 })
            // return { ...state, [player]: currentPlayerScore + 15 };
        }
        if (currentPlayerScore === 30) {

            return produce(state, draft => { draft[player] = draft[player] + 10 })
            // return { ...state, [player]: 40 };
        }
        if (currentPlayerScore === 40) {
            if (state[otherPlayer] !== 40 || state.advantage === player) {
                // Le joueur à gagné
                // console.log('WINNER', player)
                return produce(state, draft => {
                    draft.winner = player
                })
                // return { ...state, winner: player };
            }
            if (state.advantage === null) {
                // Le joueur a maintenant l'avantage
                return produce(state, draft => { draft.advantage = player })
                // return { ...state, advantage: player };
            }
            // L'autre joueur a perdu l'avantage
            return produce(state, draft => { draft.advantage = null })
            // return { ...state, advantage: null };
        }
    }
    return state;
}


export const store = createStore(reducer);

store.subscribe(() => {
    // console.log('State:', store.getState())
    if (store.getState().winner) {
        setTimeout(() => store.dispatch(restartGame()), 1500)
    }
})
