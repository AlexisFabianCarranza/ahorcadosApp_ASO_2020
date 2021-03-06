import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { GameContext } from '../controllers/GameController';
import { useGameContext } from '../controllers/useGameContext';
import { Keyboard } from '../components/Keyboard';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 0.6
    },
    letterContainer: {
        paddingHorizontal: 10,
        paddingTop: 40
    },
    letter: {
        fontSize: 50,
        fontWeight: 'bold'
    },
    lifeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 0,
        top: 0,
        paddingHorizontal: 8,
        paddingTop: 8
    },
    lifeText: {
        fontSize: 24
    }
});

const GameScreen = () => {
    const { win, gameOver, stateGameWord, life, letterIntents, play, newGame } = useContext(GameContext);

    return (
        <View style={styles.container}>
            {(win || gameOver) && (
                <>
                    <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                        <Text style={{ fontSize: 34, fontWeight: 'bold', color: win ? 'green' : 'red' }}>{win ? 'Has ganado !! yuju !' : 'Has perdido !! ohooh !'}</Text>
                    </View>
                    <View style={{ paddingHorizontal: 24 }} >
                        <Button
                            title="Jugar de nuevo"
                            onPress={newGame}
                        />
                    </View>
                </>
            )}
            <View style={styles.wordContainer}>
                {stateGameWord.map((letter, i) => (
                    <View key={i} style={styles.letterContainer}>
                        <Text style={styles.letter}>{letter}</Text>
                    </View>))}
                <View style={styles.lifeContainer}>
                    <Text style={styles.lifeText}>Vidas restantes: {life}</Text>
                </View>
            </View>
            <Keyboard
                onPressKey={play}
                letterIncludes={letterIntents}
            />
        </View>
    )
}

export const GameScreenWithContext = () => {
    const stateContext = useGameContext();
    return (
        <GameContext.Provider value={stateContext}>
            <GameScreen />
        </GameContext.Provider>)
}