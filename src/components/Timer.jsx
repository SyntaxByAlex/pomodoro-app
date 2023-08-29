import { Text, View, StyleSheet } from "react-native"

export const Timer = ({ time }) => {

    const formattedTime = `${Math.floor(time /60).toString().padStart(2,'0')}:${(time % 60).toString().padStart(2,'0')}`

    return (
        <View style={style.container}>
            <Text style={style.time}>{formattedTime}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        justifyContent:'center',
        flex: 0.3,
        backgroundColor: "#F2F2F2",
        padding: 15,
        borderRadius:15
    },
    time:{
        fontSize:80,
        fontWeight:'bold',
        textAlign:'center'
    }
})