import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Colors from '../../util/colors';

const Card = ({ children }) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        //android shadow way: the higher the lever the more shadow you have 
        elevation: 4,
        //Ios shadow way:  shadowColor, shadowOffset,  shadowOpacity, shadowRadius together 
        shadowColor: 'black',
        shadowOffset: { width: 0, heigth: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
})