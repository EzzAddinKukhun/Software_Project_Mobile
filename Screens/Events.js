import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function Events() {
    const [newfont] = useFonts({
        poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
    });
    let navigation = useNavigation();
    let route = useRoute();
    let [userId, setUserId] = useState("");
    let [events, setEvents] = useState([]);
    let months = ['JAN', 'FEB', 'MAR' , 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT','NOV', 'DEC']

    async function getUpcomingEvents() {
        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/event/getUpcomingEvents`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                setEvents(json.events);
            });

    }

    useEffect(() => {
        setUserId(route.params.userId);
        getUpcomingEvents();

    })
    return (
        <>
            <ScrollView>
                {
                    events.map((event) => {
                        return (
                            <View style={styles.eventContainer}>
                                <View style={styles.dateContainer}>
                                    <View style={styles.eventDateInfo}>
                                        {/* <Text style={styles.ss}>{new Date (event.startDate).toLocaleDateString().split("/")[1]}</Text> */}
                                        <Text style={styles.dayNumber}>{new Date (event.startDate).toLocaleDateString().split("/")[1]}</Text>
                                        <Text style={styles.ss}>{months[new Date (event.startDate).toLocaleDateString().split("/")[0]-1]}</Text>
                                    </View>
                                </View>
                                <View style={styles.eventInfoContainer}>
                                    <View style={styles.eventInfo}>
                                        <View style={styles.eventIconContainer}>
                                            <MaterialIcons style={styles.eventIcon} name="emoji-events" size={28} color="black" />
                                        </View>
                                        <View style={styles.eventEntryContainer}>
                                            <Text style={styles.eventEntry}>{event.eventName}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.eventInfo}>
                                        <View style={styles.eventIconContainer}>
                                            <FontAwesome style={styles.eventIcon} name="building-o" size={28} color="black" />
                                        </View>
                                        <View style={styles.eventEntryContainer}>
                                            <Text style={styles.eventEntry}>{event.eventLocation}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.eventInfo}>
                                        <View style={styles.eventIconContainer}>
                                            <MaterialIcons style={styles.eventIcon} name="date-range" size={28} color="black" />
                                        </View>
                                        <View style={styles.eventEntryContainer}>
                                            <Text style={styles.eventEntry}>{new Date(event.startDate).toLocaleDateString() + " - " + new Date(event.endDate).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.eventInfo}>
                                        <View style={styles.eventIconContainer}>
                                            <Ionicons style={styles.eventIcon} name="time" size={28} color="black" />
                                        </View>
                                        <View style={styles.eventEntryContainer}>
                                            <Text style={styles.eventEntry}> {new Date(event.startDate).toLocaleTimeString() + " - " + new Date(event.endDate).toLocaleTimeString()}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.eventInfo}>
                                        <View style={styles.eventIconContainer}>
                                            <MaterialCommunityIcons style={styles.eventIcon} name="format-list-bulleted-type" size={28} color="black" />
                                        </View>
                                        <View style={styles.eventEntryContainer}>
                                            <Text style={styles.eventEntry}>{event.eventType}</Text>
                                        </View>
                                    </View>
                                    <Button
                                        onPress={() => {
                                            let eventId = event._id;
                                            let id = userId; 
                                            navigation.navigate('EventInformation', {
                                                eventId, id

                                            });
                                        }}
                                        style={styles.btnView} title='View' />
                                </View>

                            </View>

                        );

                    })
                }


            </ScrollView>

        </>
    )
}

const styles = {
    eventContainer: {
        backgroundColor: "white",
        height: 230,
        padding: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        // paddingLeft: 10
        fontFamily: 'poppins',
        borderBottomWidth: 1,
        borderBottomColor: '#888',
    },
    dateContainer: {
        width: '35%',
        backgroundColor: '#2A4D69',
        height: '100%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: 'white',
        borderRadius: 5,
        fontFamily: 'poppins'

    },
    dayNumber: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: "center",
        color: 'white',
        fontFamily: 'poppins'

    },
    ss: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        fontFamily: 'poppins'


    },

    eventInfoContainer: {
        display: "flex",
        marginLeft: 10,
        fontFamily: 'poppins'


    },

    eventInfo: {
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'poppins',
        marginBottom: 7

    },

    eventEntry: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'poppins'

    },

    eventIconContainer: {
        marginRight: 6,
        fontFamily: 'poppins'
    },

    btnView: {
        marginTop: 20,
        width: '40%'
    }

}
