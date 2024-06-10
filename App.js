import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './src/screens/Login'
import CreateUser from './src/screens/CreateUser'
import CreateTask from './src/screens/CreateTask'
import EditTask from './src/screens/EditTask'
import Tasks from './src/screens/Tasks';
import About from './src/screens/About';
import Account from './src/screens/Account';
import ViewTask from "./src/screens/ViewTask";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTintColor: '#FFF',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#707070' }
                }}
            >

                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

                <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'Cadastro de Usuário'}} />

                <Stack.Screen name="CreateTask" component={CreateTask} options={{ title: 'Cadastro de Festa'}} />

                <Stack.Screen name="EditTask" component={EditTask} options={{ title: 'Editar Festa'}} />

                <Stack.Screen name="ViewTask" component={ViewTask} options={{ title: ''}} />

                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

                

            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#FFF", //Cor de ícones ativos
                tabBarInactiveTintColor: "#000", //Cor de ícones inativos
                tabBarActiveBackgroundColor: '#545454',
                tabBarShowLabel: true,
                tabBarStyle: { backgroundColor: '#707070' },
                headerShown: true,
                headerTintColor: '#FFF',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#707070' }
            }}
        >
            <Tab.Screen name="Festas" component={Tasks}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="check-circle-outline" color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen name="Conta" component={Account}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen name="Sobre" component={About}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="information-outline" color={color} size={32} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}