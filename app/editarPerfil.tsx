import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { UseAuth } from "../context/AuthContext";
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from "react-native";

export default function EditProfileScreen() {
    const { user, updateUser, loading } = UseAuth();
    const router = useRouter();

    const [name, setName] = useState("");
    const [telefono, setTelefono] = useState("");
    const [idioma, setIdioma] = useState("");
    const [biografia, setBiografia] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState("");
    const [twitterUser, setTwitterUser] = useState("");

    // Redirige si no está logueado
    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading]);

    // Rellena los campos cuando el usuario esté disponible
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setTelefono(user.telefono || "");
            setIdioma(user.idioma || "");
            setBiografia(user.biografia || "");
            setFotoPerfil(user.fotoPerfil || "");

            const match = user.fotoPerfil?.match(/unavatar\.io\/(?:x\/)?([^/]+)/);
            if (match && match[1]) {
                setTwitterUser(match[1]);
            }
        }
    }, [user]);

    const handleTwitterChange = (value: string) => {
        setTwitterUser(value);
        setFotoPerfil(`https://unavatar.io/x/${value}`);
    };

    const handleSave = async () => {
        const success = await updateUser({
            name,
            telefono,
            idioma,
            biografia,
            fotoPerfil,
        });

        if (success) {
            router.push("/profile");
        }
    };

    if (loading || !user) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1e40e8ff" />
            </View>
        );
    }

    return (
        <ScrollView style={{padding: 20, backgroundColor: "#151517ff" }}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Image source={{ uri: fotoPerfil }} style={styles.profileImage} />

                    <Text style={styles.title}>Editar Perfil</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>🐦 Usuario de Twitter (para foto):</Text>
                        <TextInput
                            style={styles.input}
                            value={twitterUser}
                            onChangeText={handleTwitterChange}
                            placeholder="@usuario"
                            placeholderTextColor={"gray"}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>📛 Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>📱 Teléfono:</Text>
                        <TextInput
                            style={styles.input}
                            value={telefono}
                            onChangeText={setTelefono}
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>🌍 Idioma:</Text>
                        <TextInput
                            style={styles.input}
                            value={idioma}
                            onChangeText={setIdioma}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>📝 Biografía:</Text>
                        <TextInput
                            style={styles.input}
                            value={biografia}
                            onChangeText={setBiografia}
                            multiline
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button title="Guardar" onPress={handleSave} color="#1e40e8ff" />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Cancelar"
                            onPress={() => router.push("/profile")}
                            color="#c91eb3ff"
                        />
                    </View>

                    <Text style={{ color: "gray", marginTop: 20 }}>
                        Registrado el{" "}
                        {user?.creadoEn
                            ? new Date(user.creadoEn).toLocaleDateString()
                            : "Fecha no disponible"}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#151517ff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 12,
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
        backgroundColor: "#ccc",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    inputGroup: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
        color: "#555",
    },
    input: {
        width: "100%",
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        color: "#333",
    },
    buttonContainer: {
        marginTop: 10,
        width: "100%",
    },
});