import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';



export default function EventInformation() {

    let [user, setUser] = useState({});
    let [userId, setUserId] = useState("");
    let [eventId, setEventId] = useState("")
    let route = useRoute();


    async function getUserInfo(id) {
        await fetch(`https://alumnibackend-fathifathallah.onrender.com/AllData/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
               setUser(json.user);
            });

    }

    useEffect(() => {
        setUserId(route.params.userId);
        console.log(route.params.userId)
        getUserInfo(route.params.userId)
    })
    return (
        <>
            <View style={styles.eventContainer}>
                {/* event name */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Profile Picture</Text></View>
                    <Image  source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/getProfilePicture/${user._id}` }} />
                </View>
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>First Name</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{user.firstName}</Text></View>
                </View>
                {/* event channel */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Last Name</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{user.lastName}</Text></View>
                </View>
                {/* event type */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Birthdate</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{ new Date(user.birthDate).toLocaleDateString()}</Text></View>
                </View>
                {/* event location */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Email</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{user.emailAddress}</Text></View>
                </View>
                {/* event time */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Country</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{user.country}</Text></View>
                </View>
                {/* event time */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Phone Number</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{user.phoneNumber}</Text></View>
                </View>
                {/* event time */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Username</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{user.userName}</Text></View>
                </View>
                {/* event time */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Specialization</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{user.specialization}</Text></View>
                </View>
               
            </View>
        </>
    )
}


const styles = {
    eventContainer: {
        height: '100%',
        width: '100%',
        fontSize: 20
    },

    eventCell: {
        display: 'flex',
        flexDirection: 'row',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#888',
    },

    eventCellDES: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#888',
    },

    bookingBtn: {
        width: '100%'

    },

    eventEntry: {
        width: '30%',
        backgroundColor: '#2A4D69',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'


    },

    eventEntryInfo: {
        width: '70%',
        backgroundColor: '#d4dce2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textEntry: {
        fontSize: 16,
        fontFamily: 'poppins',
        color: 'white'
    },
    textEntry1: {
        fontSize: 16,
        fontFamily: 'poppins',
        color: 'black',
        textAlign: 'justify',
        paddingLeft: 10,
        paddingRight: 10
    },

}