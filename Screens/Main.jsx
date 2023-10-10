import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, TextInput, Text, Button, View, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';




export default function Main() {
    const [newfont] = useFonts({
        poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
    });
    let navigation = useNavigation();
    let [userId, setUserId] = useState("");
    let route = useRoute();

    useEffect(() => {
        setUserId(route.params.userId);

    }, [])
    return (
        <>
            <View style={styles.buttonsFirstContainer}>
                <View style={styles.buttonsSecondContainer}>
                    <View onTouchStart={() => {
                        navigation.navigate('Profile', {
                            userId
                        })
                    }} style={styles.nvgt}>
                        <View>
                            <Entypo style={styles.icons} name="user" size={42} color="black" />
                            <Text style={styles.title}>Profile</Text>
                        </View>
                    </View>
                    <View onTouchStart={() => {
                        navigation.navigate('TimeLine', {
                            userId
                        })
                    }} style={styles.nvgt}>
                        <View>
                            <MaterialCommunityIcons style={styles.icons} name="timeline" size={42} color="black" />
                            <Text style={styles.title}>Timeline</Text>
                        </View>
                    </View>
                    <View onTouchStart={() => {
                        navigation.navigate('Events', {
                            userId
                        })
                    }} style={styles.nvgt}>
                        <View>
                            <MaterialIcons style={styles.icons} name="event" size={42} color="black" />
                            <Text style={styles.title}>Upcoming Events</Text>
                        </View>
                    </View>


                    <View onTouchStart={() => {
                        navigation.navigate('Userevents', {
                            userId
                        })
                    }} style={styles.nvgt}>
                        <View>
                            <FontAwesome5 style={styles.icons} name="history" size={42} color="black" />
                            <Text style={styles.title}>Events History</Text>
                        </View>
                    </View>


                    <View onTouchStart={() => {
                        navigation.navigate('Channels', {
                            userId
                        })
                    }} style={styles.nvgt}>
                        <View>
                            <SimpleLineIcons style={styles.icons} name="organization" size={42} color="black" />
                            <Text style={styles.title}>Channels</Text>
                        </View>
                    </View>






                    <View onTouchStart={() => {
                        navigation.navigate('Channels', {
                            userId
                        })
                    }} style={styles.nvgt}>
                        <View>
                            <AntDesign style={styles.icons} name="poweroff" size={42} color="black" />
                            <Text style={styles.title}>Logout</Text>
                        </View>
                    </View>

                </View>


            </View>
        </>
    )



}

const styles = {
    buttonsFirstContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },

    buttonsSecondContainer: {
        width: '80%',
        height: '60%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    nvgt: {
        width: '50%',
        height: '30%',
        backgroundColor: '#2A4D69',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 23,
        borderWidth: 2,
        borderRadius: 15
    },
    icons: {
        textAlign: 'center',
        color: 'white'

    },

    title: {
        textAlign: 'center',
        marginTop: 6,
        color: 'white',
        fontSize: 11,
        fontFamily: 'poppins'
    }

}
