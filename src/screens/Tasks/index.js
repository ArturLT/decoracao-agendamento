import { View, Text, TouchableOpacity, FlatList, Modal, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, orderByChild, query, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
const db = getDatabase();
const auth = getAuth();

export default function Tasks({ navigation }) {
    const [tasks, setTask] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Popup para remover tarefa
    const deleteTask = (id) => {
        return Alert.alert(
            "Excluir tarefa",
            "Você tem certeza que deseja remover uma tarefa?",
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Confirmar",
                    // Função que remove tarefa do banco quando o usuário clica na opção "Confirmar" do popup
                    onPress: () => remove(ref(db, 'tasks/' + auth.currentUser.uid + '/' + id))
                }
            ]
        );
    };

    //Hook que executa a função para listar as tarefas do banco logo que a tela é aberta
    useEffect(() => {
        const listTask = query(ref(db, 'tasks/' + auth.currentUser.uid), orderByChild('date'));
        onValue(listTask, (snapshot) => {
            // Array que vai recer as tarefas para serem listadas
            const list = []
            // Recuperação das tarefas, funciona como um laço
            snapshot.forEach((data) => {
                // Inserção da cada tarefa no array
                list.push({ ...data.val(), id: data.key });

            });
            // Seta o array preenchido no Hook de tarefas para serem listadas
            setTask(list)
        });
    }, [])


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Compoente para listar tarefas recupedas do banco */}
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                renderItem={({ item }) =>
                    <View style={styles.tarefa}>
                        <View>
                            <Text style={styles.data}>{item.date}</Text>
                            <Text style={styles.descricao}>{item.description}</Text>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditTask', { id: item.id })}
                            >
                                <Text style={styles.descricao}><MaterialCommunityIcons name="file-document-edit-outline" size={32} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deleteTask(item.id)}
                            >
                                <Text style={styles.descricao}><MaterialCommunityIcons name="delete-outline" size={32} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />

            {/* Botão para abrir tela de criar tarefa */}
            {/* Este botão fica flutuando no canto inferir direito da tela */}
            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => navigation.navigate('CreateTask')}
            >
                <Text style={styles.textButtonCreate}>+</Text>
            </TouchableOpacity>
        </View>
    )
}