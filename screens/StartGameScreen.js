import { View, TextInput, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from '../util/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

export default function StartGameScreen({ onPickNumber }) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const { width, height } = useWindowDimensions();
    const numberInputHandler = (value) => {
        setEnteredNumber(value);
    }

    const resetInputHandler = () => {
        setEnteredNumber('');
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            //show alert ..
            Alert.alert(
                'Invalid Number',
                'Number has to be a number between 1 and 99.',
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: resetInputHandler
                }]
            )
            return;
        }
        onPickNumber(chosenNumber)
        console.log('Valid Number!!')
    }

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior="position">
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            maxLength={2}
                            keyboardType={"number-pad"}
                            autoCorrect={false}
                            autoCapitalize="none"
                            value={enteredNumber}
                            onChangeText={numberInputHandler}

                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>

                        </View>
                    </Card >
                </View >
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})