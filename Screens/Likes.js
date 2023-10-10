import { Flex } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function Likes() {
    let route = useRoute();
    const [likes, setLikes] = useState([]);

    async function getPostLikes(id) {
        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/posts/getPostLikes/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                setLikes(json.postLikes);
            });

    }



    useEffect(() => {
        getPostLikes(route.params.msg);

    }, [])



    return (
        <>
            {
                likes.map((like) => {
                    return (
                        <View style={styles.likeComponent}>
                            <View style={styles.likeThumb}>
                                <Image source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/getProfilePicture/${like._id}` }}></Image>
                                <View style={styles.likeSymb}>
                                    <AntDesign name="heart" size={18} color="red" />
                                </View>
                            </View>
                            <View style={styles.likeUserName}>
                                <View>
                                    <Text style={styles.likeUserNameText}>{like.firstName + " " + like.lastName}</Text>
                                </View>
                            </View>
                        </View>
                    );

                })
            }

        </>
    )
}


const styles = {
    likeComponent: {
        width: '100%',
        height: 70,
        display: 'flex',
        flexDirection: "row",
        padding: 5
    },

    likeThumb: {
        paddingLeft: 20,
        width: 55,
        height: 55,
        borderRadius: 50,
        backgroundColor: "yellow",
        position: "relative"

    },

    likeUserName: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 12

    },

    likeUserNameText: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    likeSymb: {
        position: "absolute",
        bottom: 0,
        right: 0,
    }
}