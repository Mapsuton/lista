import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

export default function App() {
  const [ text, setText] = useState('');
  const [data, setData] = useState('');

  const buttonLisaa = () => {
    setData([...data, { key:text }]);
    setText('');
  }

  const buttonTyhjenna = () => {
    setData([...'']);
    setText('');
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={text => setText(text)} value={text} />
      <View style={styles.operators}>
      <Button onPress={buttonLisaa} title='Lisää' />
      <Button onPress={buttonTyhjenna} title='Tyhjennä' />
      </View>
      <Text style={styles.header}>Ostoslista</Text>
      <FlatList style={styles.list}
      data={data}
      renderItem={({ item }) =>

    <Text> {item.key}</Text>
      }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  operators: {
    width: '50%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  header: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
  input: {
    marginTop: 50,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
});
