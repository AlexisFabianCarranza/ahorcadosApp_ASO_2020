import { useState, useEffect } from 'react';
import { gameInitState } from './GameController';

const getIndexOfLetter = (word, letter) => {
    const indexs = [];
    for (var i = 0; i < word.length; i++) {
        if (word[i].toLowerCase() === letter.toLowerCase()) indexs.push(i);
    }
    return indexs
}


//TODO OBTENER OTRA PALABRA
const word = 'ricardo';

export const useGameContext = () => {
    const [gameState, setGameState] = useState({
        word: word,
        stateGameWord: word.split('').map(() => '_'),
        life: 3,
        win: false,
        gameOver: false,
        letterIntents: []
    });

    const play = (letter) => {
        let { word, stateGameWord, life, letterIntents, win, gameOver } = gameState;
        const indexs = getIndexOfLetter(word, letter);
        let newStateWord = [...stateGameWord];
        if (!indexs.length) {
            life = life - 1
            if (life === 0) {
                gameOver = true
            }
        } else {
            indexs.forEach((index) => {
                newStateWord[index] = letter;
            });
        }
        letterIntents.push(letter);

        if (word.toLowerCase() === newStateWord.join('').toLowerCase()) {
            win = true
        }

        setGameState({
            ...gameState,
            stateGameWord: newStateWord,
            life,
            letterIntents,
            win,
            gameOver
        })
    };

    const newGame = () => {
        setGameState(gameInitState);
    }

    const [contextState, setcontextState] = useState({
        ...gameState,
        play
    });

    useEffect(() => {
        setcontextState({
            ...gameState,
            play,
            newGame
        })
    }, [gameState])

    return contextState
}