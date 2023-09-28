import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppingList.db')

export default function App() {

  const [ title, setTitle] = useState('');
  const [ amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState('');

  useEffect(() => {
    db.transaction(tx => {
    tx.executeSql('create table if not exists shoppingList (id integer primary key not null, title text, amount text);');
    }, 
      null,
      updateList);
    }, []);  

    const updateList = () => {
      db.transaction(tx => {
      tx.executeSql('select * from shoppingList;', [], (_, { rows }) =>
      setShoppingList(rows._array)
      );
      }, null, null);
      };

      const saveItem = () => {
        db.transaction(tx => {
        tx.executeSql('insert into shoppingList (title, amount) values (?, ?);',
        [title, amount]);
        }, null, updateList)
        };

  // const buttonLisaa = () => {
  //   setData([...data, { key:title, amount }]);
  //   setTitle('');
  // }

    
    const deleteItem = (id) => {
      db.transaction(
        tx => tx.executeSql('delete from shoppingList where id = ?;', [id]),
        null,
        updateList)
      };

  // const buttonTyhjenna = () => {
  //   setData([...'']);
  //   setTitle('');
  //   setAmount('');
  // }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Product' onChangeText={title => setTitle(title)} value={title} />
      <TextInput style={styles.input} placeholder='Amount' onChangeText={amount => setAmount(amount)} value={amount} />
      <View style={styles.operators}>
      <Button onPress={saveItem} title='Save' />
      </View>
      <Text style={styles.header}>Shopping list</Text>
      <FlatList 
      style={styles.list}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
      <View style={styles.list}>
        <Text>{item.title}, {item.amount}   </Text>
        <Text style={{color: 'blue'}} onPress={() => deleteItem(item.id)}>Bought</Text>
        </View>}
      data={shoppingList}
       />
    </View>
  );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginLeft: 50,
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
  },
  header: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 30,
    color: 'blue',
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
});
