import { useRouter } from "expo-router"
import { UseAuth } from "../context/AuthContext"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"

export default function LoginScreen() {
    const { login } = UseAuth()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleLogin = async () => {
        // Validación simple
        if (!email || !password) {
            setErrorMessage("Por favor completa todos los campos")
            return
        }

        setErrorMessage("") // limpia errores anteriores

        const success = await login(email, password)

        if (success) {
            router.replace("/home")
        } else {
            setErrorMessage("Usuario o contraseña incorrecta")
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#151517ff" }}>
            <View style={style.body}>
                <View style={style.containerLogin}>
                    <Text style={style.login_title}>Login</Text>
                    <Text style={style.login_title}>Bienvenido!</Text>

                    {errorMessage !== "" && (
                        <Text style={style.errorText}>{errorMessage}</Text>
                    )}

                    <View style={style.login_inputs_container}>
                        <TextInput
                            style={style.login_inputs_input}
                            keyboardType="email-address"
                            placeholder="Ingresa tu correo"
                            value={email}
                            placeholderTextColor={"gray"}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={style.login_inputs_input}
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            placeholderTextColor={"gray"}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <View style={style.login_buttons_container}>
                        <Button color={"#1e40e8ff"} title="Iniciar sesión" onPress={handleLogin} />
                        <Text>ó</Text>
                        <Button color={"#c91eb3ff"} title="Registrarse como nuevo usuario" onPress={() => router.push("/register")} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '40%',
        borderRadius: 5
    },
    containerLogin: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        width: '80%'
    },
    login_title: {
        fontSize: 20,
        marginBottom: 10
    },
    login_inputs_container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 20,
    },
    login_inputs_input: {
        color: "black",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#e0e0e0ff"
    },
    login_buttons_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        gap: 10
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center"
    }
})