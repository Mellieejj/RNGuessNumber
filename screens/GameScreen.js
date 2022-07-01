import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons'
import GuessLogItem from '../components/game/GuessLogItem';


const generatedRandomBetween = (min, max, exclude) => {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generatedRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

export default function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generatedRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentState] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundry = 1;
        maxBoundry = 100;
    }, [])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert(
                "Don't lie!",
                "You know this is wrong...",
                [{
                    text: 'Sorry',
                    style: 'cancel'
                }]
            )
            return;
        }
        direction === 'lower'
            ? maxBoundry = currentGuess
            : minBoundry = currentGuess + 1;
        const newRndmNumber = generatedRandomBetween(minBoundry, maxBoundry, currentGuess)
        setCurrentState(newRndmNumber)
        setGuessRounds((prevState) => [newRndmNumber, ...prevState])
    }

    const guessRoundsListLength = guessRounds.length;

    let content = (<>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instrcutionText}>Higher or Lower ?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name='md-remove' size={24} color={'white'} />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color={'white'} />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>);

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name='md-remove' size={24} color={'white'} />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name='md-add' size={24} color={'white'} />
                        </PrimaryButton>
                    </View>
                </View>
            </>

        )
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}</Text>)} */}
                <FlatList
                    data={guessRounds}
                    renderItem={(itemData) => <GuessLogItem guess={itemData.item} roundNumber={guessRoundsListLength - itemData.index} />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instrcutionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'

    }
})