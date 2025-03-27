import { useRouter } from "expo-router";
import { UseAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const { user, logout, loading } = UseAuth();
    const router = useRouter();

    // Noticias aleatorias
    const noticias = [
        { titulo: "Trump presenta el F-47, el caza más letal jamás construido", contenido: "El presidente de EE. UU., Donald Trump, ha presentado el F-47, un caza de sexta generación desarrollado bajo el programa Next Generation Air Dominance (NGAD) y fabricado por Boeing." },
        { titulo: "¡Feliz cumpleaños, David Bustamante!", contenido: "Celebramos su cumpleaños repasando sus éxitos más recientes, incluyendo el lanzamiento de su álbum 'Inédito' y su participación en programas de televisión como 'Tu cara me suena'." },
        { titulo: "Trump cumple un sueño póstumo de Fidel Castro al silenciar Radio y TV Martí", contenido: "La administración de Donald Trump ha cerrado Radio y Televisión Martí, cumpliendo un antiguo deseo de Fidel Castro de silenciar estas emisoras que transmitían desde Miami a Cuba desde 1985." },
        { titulo: "Regreso de Luis Felipe Jaramillo a Noticias Caracol tras 10 años", contenido: "El periodista Luis Felipe Jaramillo ha regresado a las pantallas de Noticias Caracol después de más de una década, tras haberse dedicado a la dirección de eventos deportivos." },
        { titulo: "Zelenski pide a la UE mantener sanciones a Rusia hasta que detenga la guerra", contenido: "En una reciente cumbre en París, el presidente ucraniano Volodímir Zelenski solicitó a la Unión Europea que no levante las sanciones a Rusia hasta que cese el conflicto armado." },
        { titulo: "Anagrama suspende distribución de 'El odio', libro sobre el crimen de José Bretón", contenido: "La editorial Anagrama ha suspendido indefinidamente la distribución del libro 'El odio', que aborda el crimen de José Bretón, debido a controversias surgidas tras su publicación." },
        { titulo: "Macron anuncia misión franco-británica a Ucrania para estudiar despliegue de fuerza de paz", contenido: "El presidente francés, Emmanuel Macron, ha anunciado una misión conjunta con el Reino Unido a Ucrania para evaluar la posibilidad de desplegar una fuerza de paz en la región conflictiva." },
        { titulo: "Israel mata al portavoz de Hamás en el norte de Gaza", contenido: "En recientes enfrentamientos, las fuerzas israelíes han abatido al portavoz de Hamás en el norte de Gaza, intensificando las tensiones en la región." },
        { titulo: "La ONU advierte del riesgo de hambruna en Gaza por bloqueo israelí a ayuda humanitaria", contenido: "La Organización de las Naciones Unidas ha expresado preocupación por el riesgo de hambruna en Gaza debido al bloqueo impuesto por Israel a la entrada de ayuda humanitaria." },
        { titulo: "Departamento de Salud de EE. UU. anuncia despido de 10,000 empleados", contenido: "El Departamento de Salud y Servicios Humanos de EE. UU. ha informado sobre la eliminación de 10,000 puestos de trabajo en medio de la cancelación de programas clave." },
        { titulo: "Walmart invertirá más de 6,000 millones de dólares en México durante 2025", contenido: "La cadena minorista Walmart ha anunciado planes para invertir más de 6,000 millones de dólares en México durante el año 2025, enfocándose en la expansión y modernización de sus operaciones." },
        { titulo: "Incendios forestales dejan 27 muertos en Corea del Sur; evacúan a miles", contenido: "Los incendios forestales en Corea del Sur han dejado al menos 27 muertos y obligaron a la evacuación de miles de personas, con las autoridades luchando por contener las llamas." },
        { titulo: "Google lanza nuevo sistema de inteligencia artificial para la educación", contenido: "Google ha lanzado un sistema de inteligencia artificial que ayudará a los maestros a personalizar la enseñanza y mejorar el aprendizaje de los estudiantes en todo el mundo." },
        { titulo: "España lanza una nueva campaña para promover el turismo post-pandemia", contenido: "España ha lanzado una nueva campaña global para recuperar el turismo, especialmente en las zonas costeras, tras los efectos de la pandemia de COVID-19." },
        { titulo: "NASA anuncia el descubrimiento de agua en un planeta fuera del sistema solar", contenido: "La NASA ha anunciado el descubrimiento de agua en un planeta situado fuera de nuestro sistema solar, lo que podría significar que la vida es posible en otros mundos." },
        { titulo: "Elon Musk presenta su nuevo proyecto de viajes espaciales comerciales", contenido: "Elon Musk ha presentado su nuevo proyecto de SpaceX, que incluye vuelos espaciales comerciales para ciudadanos privados, marcando un avance significativo en la industria." },
        { titulo: "China lanza el satélite de comunicaciones más avanzado de la historia", contenido: "China ha lanzado el satélite de comunicaciones más avanzado del mundo, que promete revolucionar la conectividad global y mejorar la velocidad de internet en áreas remotas." },
        { titulo: "Un nuevo estudio revela el impacto del cambio climático en las especies marinas", contenido: "Un estudio reciente ha revelado que el cambio climático está afectando gravemente a las especies marinas, modificando sus hábitats y provocando una disminución en su población." },
        { titulo: "Nueva legislación en Brasil protege los derechos de los pueblos indígenas", contenido: "El gobierno brasileño ha aprobado una nueva legislación que protege los derechos territoriales de los pueblos indígenas, garantizando su acceso a tierras ancestrales." },
        { titulo: "Rusia realiza ejercicios militares a gran escala cerca de la frontera con Ucrania", contenido: "Rusia ha llevado a cabo ejercicios militares de gran escala cerca de la frontera con Ucrania, lo que ha generado preocupación internacional sobre una posible escalada del conflicto." }
    ];

    const [noticiaAleatoria, setNoticiaAleatoria] = useState(getRandomNews);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading]);

    // Función para obtener una noticia aleatoria
    function getRandomNews() {
        return noticias[Math.floor(Math.random() * noticias.length)];
    }

    // Función para recargar una nueva noticia
    const handleRecargarNoticia = () => {
        setNoticiaAleatoria(getRandomNews());
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#1e40e8ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.card}>
                <Text style={styles.welcome}>¡Bienvenido, {user?.name}!</Text>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Button color={"#1e40e8ff"} title="Ir al perfil" onPress={() => router.push("/profile")} />
                    </View>

                    <View style={styles.buttonWrapper}>
                        <Button
                            title="Cerrar sesión"
                            color="#c91eb3ff"
                            onPress={() => {
                                logout();
                                router.replace("/login");
                            }}
                        />
                    </View>
                </View>
            </View>

            {/* Noticias aleatorias */}
            <View style={styles.noticias}>
                <View style={{display: "flex", flexDirection: "row", marginBottom: 20, justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                        Noticias recientes
                    </Text>
                    <TouchableOpacity
                        style={styles.recargarButton}
                        onPress={handleRecargarNoticia}
                    >
                        <Ionicons name="reload" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
                        {noticiaAleatoria.titulo}
                    </Text>
                    <Text>{noticiaAleatoria.contenido}</Text>
                </View>
                <Text style={{ color: "gray", marginTop: 15, alignSelf: "flex-end" }}>
                    {noticias.length} noticias disponibles.
                </Text>
            </View>
        </View>
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
    recargarButton: {
        backgroundColor: "#fff",
        borderRadius: 50,
        padding: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 3,
    },
    card: {
        backgroundColor: "white",
        padding: 30,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
    },
    welcome: {
        fontSize: 22,
        fontWeight: "600",
        marginBottom: 20,
        color: "#333",
    },
    buttonContainer: {
        width: "100%",
    },
    buttonWrapper: {
        marginBottom: 15,
    },
    noticias: {
        marginTop: 20,
        width: "50%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
    },
});
