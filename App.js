import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header } from '@rneui/themed';
import { Input, Button, ListItem } from '@rneui/themed';
import { Icon } from '@rneui/themed';

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
        console.log(title)

        };
    
    const deleteItem = (id) => {
      db.transaction(
        tx => tx.executeSql('delete from shoppingList where id = ?;', [id]),
        null,
        updateList)
      };

  renderItem = ({ item }) => (
    <ListItem bottomDivider>
    <ListItem.Content> 
    <ListItem.Title>{item.title}</ListItem.Title>
    <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
    )

    // <ListItem.RightIcon>
    // <Icon name="delete" color="red" onPress={() => deleteItem(item.id)}/>
    // </ListItem.RightIcon>

    // <Text>{item.title}, {item.amount}   </Text>
    //     <Text style={{color: 'blue'}} onPress={() => deleteItem(item.id)}>Bought</Text>
    //     </View>}
    

  return (
    <View style={styles.container}>
      <Header centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
/>
      <Input placeholder='Product' onChangeText={title => setTitle(title)} value={title} />
      <Input placeholder='Amount' onChangeText={amount => setAmount(amount)} value={amount} />
      <View>
      <Button raised icon={{name: 'save'}}onPress={saveItem} title='Save' />
      </View>
      <FlatList
      data={shoppingList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      />
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
