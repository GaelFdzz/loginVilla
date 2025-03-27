import { useRouter } from "expo-router"
import { UseAuth } from "../context/AuthContext"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#151517ff" }}>
            <View style={style.body}>
                <View style={style.containerLogin}>
                    <Text style={style.login_title}>Iniciar sesión</Text>
                    <Text style={style.login_title}>Bienvenido!</Text>

                    {errorMessage !== "" && (
                        <Text style={style.errorText}>{errorMessage}</Text>
                    )}

                    <View style={style.login_inputs_container}>
                        <View>
                            <Text>Correo electronico</Text>
                            <TextInput
                                style={style.login_inputs_input}
                                keyboardType="email-address"
                                placeholder="Ingresa tu correo"
                                value={email}
                                placeholderTextColor={"gray"}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View>
                            <Text>Contraseña</Text>
                            <TextInput
                                style={style.login_inputs_input}
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                placeholderTextColor={"gray"}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                    </View>

                    <View style={style.login_buttons_container}>
                        <Button color={"#c91eb3ff"} title="Iniciar sesión" onPress={handleLogin} />
                        <View style={{ display: "flex", flexDirection: "row", gap: 10, marginTop: 15 }}>
                            <Text>¿Ya tienes una cuenta?</Text>
                            <TouchableOpacity onPress={() => router.replace("/register")}>
                                <Text style={{ textDecorationLine: "underline", color: "blue", fontWeight: "bold" }}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
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
        fontSize: 30,
        marginBottom: 10,
        alignSelf: "center"
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