import { useRouter } from "expo-router"
import { UseAuth } from "../context/AuthContext"
import { useState } from "react"
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function Register() {
    const { register } = UseAuth()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nombre, setNombre] = useState("")
    const [twitterUser, setTwitterUser] = useState("") // 👉 Nuevo estado para el usuario de Twitter
    const [fotoPerfil, setFotoPerfil] = useState("https://unavatar.io/x/") // 👉 URL base
    const [biografia, setBiografia] = useState("")
    const [telefono, setTelefono] = useState("")
    const [idioma, setIdioma] = useState("")

    const [errorMessage, setErrorMessage] = useState("") // 👉 para mostrar errores

    const handleRegister = async () => {
        // Validaciones
        if (!email || !password || !nombre || !fotoPerfil || !biografia || !telefono || !idioma) {
            setErrorMessage("Por favor llena todos los campos")
            return
        }

        const emailRegex = /\S+@\S+\.\S+/
        if (!emailRegex.test(email)) {
            setErrorMessage("Ingresa un correo electrónico válido")
            return
        }

        const phoneRegex = /^[0-9]{8,15}$/
        if (!phoneRegex.test(telefono)) {
            setErrorMessage("Ingresa un número de teléfono válido (solo números)")
            return
        }

        setErrorMessage("") // limpia el mensaje antes de registrar

        const success = await register(email, password, nombre, fotoPerfil, biografia, telefono, idioma)

        if (success) {
            setErrorMessage("") // borra cualquier error anterior
            router.replace("/login") // redirige a login
        } else {
            setErrorMessage("No se pudo registrar el usuario. Usuario ya registrado.")
        }
    }

    // Actualiza la URL de la foto de perfil dinámicamente
    const handleTwitterUserChange = (value: string) => {
        setTwitterUser(value)
        setFotoPerfil(`https://unavatar.io/${value}`)
    }

    return (
        <ScrollView style={{ padding: 20, backgroundColor: "#151517ff" }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <View style={style.body}>
                    <View style={style.containerLogin}>
                        <Text style={style.login_title}>Registro de usuarios</Text>
                        <Text style={style.login_title}>¡Bienvenido! {nombre}</Text>

                        <View style={style.login_inputs_container}>
                            <View>
                                <Text>Correo Electrónico</Text>
                                <TextInput style={style.login_inputs_input} keyboardType="email-address" placeholder="Ingresa tu correo" value={email} placeholderTextColor={"gray"} onChangeText={setEmail} />
                            </View>
                            <View>
                                <Text>Contraseña</Text>
                                <TextInput style={style.login_inputs_input} placeholder="Ingresa tu contraseña" value={password} placeholderTextColor={"gray"} onChangeText={setPassword} secureTextEntry />
                            </View>
                            <View>
                                <Text>Nombre</Text>
                                <TextInput style={style.login_inputs_input} placeholder="Ingresa tu nombre" value={nombre} placeholderTextColor={"gray"} onChangeText={setNombre} />
                            </View>
                            <View>
                                <Text>Foto de perfil usando tu usuario de Twitter</Text>
                                <TextInput style={style.login_inputs_input} placeholder="Ingresa tu usuario de Twitter" value={twitterUser} placeholderTextColor={"gray"} onChangeText={handleTwitterUserChange} />
                            </View>
                            <View>
                                <Text>Biografía</Text>
                                <TextInput style={style.login_inputs_input} placeholder="Ingresa tu biografía" value={biografia} placeholderTextColor={"gray"} onChangeText={setBiografia} />
                            </View>
                            <View>
                                <Text>Número de Teléfono</Text>
                                <TextInput style={style.login_inputs_input} keyboardType="numeric" placeholder="Ingresa tu número de teléfono" value={telefono} placeholderTextColor={"gray"} onChangeText={setTelefono} />
                            </View>
                            <View>
                                <Text>Idioma</Text>
                                <TextInput style={style.login_inputs_input} placeholder="Ingresa tu idioma" value={idioma} placeholderTextColor={"gray"} onChangeText={setIdioma} />
                            </View>
                        </View>

                        {errorMessage !== "" && (
                            <Text style={style.errorText}>{errorMessage}</Text>
                        )}

                        <View style={style.login_buttons_container}>
                            <Button color={"#c91eb3ff"} title="Registrarse" onPress={handleRegister} />
                            <View style={{ display: "flex", flexDirection: "row", gap: 10, marginTop: 15 }}>
                                <Text style={{}}>¿Ya tienes una cuenta?</Text>
                                <TouchableOpacity onPress={() => router.replace("/login")}>
                                    <Text style={{ textDecorationLine: "underline", color: "blue", fontWeight: "bold" }}>Iniciar sesión</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '40%',
        borderRadius: 5,
        fontFamily: 'system-ui'
    },
    containerLogin: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        width: '80%',
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
        backgroundColor: "#ebebebff"
    },
    login_buttons_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center"
    }
})
