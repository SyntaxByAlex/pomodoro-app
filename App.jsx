import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Header } from './src/components/Header';
import { Timer } from './src/components/Timer';
import { Audio } from 'expo-av'



const colors = ["orange", "gray", "#D7BDE2"]

export default function App() {

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(25 * 60)
  const [curretTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK")
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval = null;

    if (isActive) {
      //run timmer
      interval = setInterval(() => {
        setTime(time - 1)
      }, 2);
    } else {
      //clear inteval
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsRunning((prev) => !prev)
      setTime(isRunning ? 300 : 1500)
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  const handleStarStop = () => {
    playSound()
    setIsActive(!isActive);
  }


  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/sonido-gato.mp3')
    )
    await sound.playAsync()
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[curretTime] }]}>
      <View style={{ paddingTop: Platform.OS === "android" && 30, flex: 1, paddingHorizontal: 15 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header curretTime={curretTime} setCurrentTime={setCurrentTime} setTime={setTime} />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStarStop}>
          <Text style={{ color: 'white', fontWeight: 'bold' }} >{isActive ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  text: {
    fontSize: 32, fontWeight: "bold"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#333333',
    marginTop: 15,
    padding: 15,
    borderRadius: 15
  }
});
