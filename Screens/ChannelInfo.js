import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';



export default function ChannelInfo() {

    let [channel, setChannel] = useState({});
    let [chId, setChannelId] = useState("");
    let route = useRoute();
    async function getChannelInfo(id) {
        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/orginization/getOrgInfo/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                setChannel(json.orgInfo);
            });

    }

    useEffect(() => {
        console.log(route.params.channelId)
        getChannelInfo(route.params.channelId);
    })
    return (
        <>
        {console.log(channel)}
            <View style={styles.eventContainer}>
                {/* event name */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Name</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{channel.channelName}</Text></View>
                </View>
                {/* event channel */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Org. Name</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{channel.orginizationName}</Text></View>
                </View>
                {/* event type */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Expert Name</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{channel.expertName}</Text></View>
                </View>
                {/* event location */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Location</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{channel.country + "/" +channel.city}</Text></View>
                </View>
                {/* event time */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Category</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{channel.category}</Text></View>
                </View>
                {/* event time */}
                <View style={styles.eventCell}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Expert Number</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>{channel.expertPhoneNumber}</Text></View>
                </View>
                {/* event description */}
                <View style={styles.eventCellDES}>
                    <View style={styles.eventEntry}><Text style={styles.textEntry}>Description</Text></View>
                    <View style={styles.eventEntryInfo}><Text style={styles.textEntry1}>
                        {channel.description}
                    </Text></View>
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