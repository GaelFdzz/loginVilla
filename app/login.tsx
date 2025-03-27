import { useRouter } from "expo-router";
import { UseAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";

export default function LoginScreen() {
    const { login, user, loading } = UseAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!loading && user) {
            router.replace("/home"); // Redirige automáticamente si ya está autenticado
        }
    }, [user, loading]);

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Por favor completa todos los campos");
            return;
        }

        setErrorMessage("");

        const success = await login(email, password);

        if (!success) {
            setErrorMessage("Usuario o contraseña incorrecta");
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#c91eb3ff" />
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                <View style={styles.containerLogin}>
                    <Text style={styles.login_title}>Iniciar sesión</Text>
                    <Text style={styles.login_title}>¡Bienvenido!</Text>

                    {errorMessage !== "" && (
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    )}

                    <View style={styles.login_inputs_container}>
                        <View>
                            <Text>Correo electrónico</Text>
                            <TextInput
                                style={styles.login_inputs_input}
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
                                style={styles.login_inputs_input}
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                placeholderTextColor={"gray"}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View style={styles.login_buttons_container}>
                        <Button color={"#c91eb3ff"} title="Iniciar sesión" onPress={handleLogin} />
                        <View style={styles.registerContainer}>
                            <Text>¿No tienes una cuenta?</Text>
                            <TouchableOpacity onPress={() => router.replace("/register")}>
                                <Text style={styles.registerLink}>Registrarse</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151517ff",
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minWidth: "40%",
        borderRadius: 5,
    },
    containerLogin: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 5,
        width: "80%",
    },
    login_title: {
        fontSize: 30,
        marginBottom: 10,
        alignSelf: "center",
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
        backgroundColor: "#e0e0e0ff",
    },
    login_buttons_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        gap: 10,
    },
    registerContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        marginTop: 15,
    },
    registerLink: {
        textDecorationLine: "underline",
        color: "blue",
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151517ff",
    },
});