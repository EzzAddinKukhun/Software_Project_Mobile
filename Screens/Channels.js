import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';


export default function Channels() {
    const [newfont] = useFonts({
        poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
    });
    let [channels, setChannels] = useState([]);
    let [recoChannels, setRecoChannels] = useState([]);
    let [userId, setUserId] = useState("");
    let route = useRoute();
    let navigator = useNavigation();
    async function getUserChannels(id) {
        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/orginization/getUserChannels/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                setChannels(json.org);
            });

    }
    async function getRecoChannels(id) {
        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/orginization/getUserRecommendedChannels/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                setRecoChannels(json.recommendedChannels);
            });

    }

    useEffect(() => {
        setUserId(route.params.userId);
        getUserChannels(route.params.userId);
        getRecoChannels(route.params.userId)

    })
    return (
        <>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <View style={styles.displayFlex}>
                        <Text style={styles.title}>My Channels</Text>
                    </View>
                </View>

                {
                    channels.map((channel) => {
                        return (<View

                            style={styles.channelContainer}>
                            <View style={styles.channelThumbnail}>
                                <Image style={styles.cardImage} source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/api/orginization/getOrginizationCoverPic/${channel.orgId}` }} />
                            </View>
                            <View style={styles.channelData}>
                                <View
                                    onTouchEnd={() => {
                                        let channelId = channel.orgId;
                                        navigator.navigate('ChannelInfo', {
                                            channelId
                                        }
                                        )
                                    }}
                                    style={styles.channelGetName}>
                                    <Text style={styles.channelNameCard}>{channel.channelName}</Text>
                                    <Text style={styles.channelOrgNameCard}>{channel.orginizationName}</Text>
                                </View>
                                <View
                                    onTouchStart={async () => {

                                        let _id = userId;
                                        let channelId = channel.orgId;

                                        let data = {
                                            _id,
                                            channelId
                                        }


                                        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/orginization/unfollowChannel`, {
                                            method: 'PUT',
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-type": "application/json; charset=UTF-8"
                                            }
                                        }).then(response => response.json())
                                            .then(json => {

                                            });

                                    }}

                                    style={styles.channelFollow}>
                                    <View style={styles.followIconContainer}>
                                        <SimpleLineIcons name="user-unfollow" size={30} color="white" />
                                    </View>
                                </View>
                            </View>

                        </View>);

                    })
                }



                <View style={styles.titleContainer}>
                    <View style={styles.displayFlex}>
                        <Text style={styles.title}>Recommended Channels</Text>
                    </View>
                </View>

                {
                    recoChannels.map((channel) => {
                        return (<View

                            style={styles.channelContainer}>
                            <View style={styles.channelThumbnail}>
                                <Image style={styles.cardImage} source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/api/orginization/getOrginizationCoverPic/${channel.orgId}` }} />
                            </View>
                            <View style={styles.channelData}>
                                <View
                                    onTouchEnd={() => {
                                        let channelId = channel.orgId;
                                        navigator.navigate('ChannelInfo', {
                                            channelId
                                        }
                                        )
                                    }}

                                    style={styles.channelGetName}>
                                    <Text style={styles.channelNameCard}>{channel.channelName}</Text>
                                    <Text style={styles.channelOrgNameCard}>{channel.orginizationName}</Text>
                                </View>
                                <View
                                    onTouchStart={async () => {

                                        let _id = userId;
                                        let channelId = channel.orgId;

                                        let data = {
                                            _id,
                                            channelId
                                        }


                                        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/orginization/followChannel`, {
                                            method: 'PUT',
                                            body: JSON.stringify(data),
                                            headers: {
                                                "Content-type": "application/json; charset=UTF-8"
                                            }
                                        }).then(response => response.json())
                                            .then(json => {

                                            });

                                    }}



                                    style={styles.channelFollow}>
                                    <View style={styles.followIconContainer}>
                                        <AntDesign name="adduser" size={30} color="white" />
                                    </View>
                                </View>
                            </View>

                        </View>);

                    })
                }

            </ScrollView>
        </>
    )
}


const styles = {
    channelContainer: {
        width: '100%',
        height: 300
    },

    channelThumbnail: {
        width: '100%',
        height: 220,
        backgroundColor: 'yellow'
    },

    cardImage: {
        width: '100%',
        height: '100%'
    },

    channelData: {
        height: 80,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },

    channelGetName: {
        width: '80%',
        height: 80,
        backgroundColor: '#d4e0ea'
    },

    channelFollow: {
        width: '20%',
        height: 80,
        backgroundColor: '#2A4D69',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    followIconContainer: {
        // backgroundColor: 'red'

    },

    channelNameCard: {
        fontFamily: 'poppins',
        fontSize: 18
    },

    channelOrgNameCard: {
        fontFamily: 'poppins',
        fontSize: 13
    },
    titleContainer: {
        height: 30,
        backgroundColor: '#96a4af',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'


    },

    title: {
        fontFamily: 'poppins',
        height: 30,
        color: 'black'
    },






}
