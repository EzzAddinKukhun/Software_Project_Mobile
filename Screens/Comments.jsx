import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { View, Text, Image, Button } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Comments() {
    let route = useRoute();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [userId, setUserId] = useState("");
    const [postId, setPostId] = useState("");


    async function getComments(id) {
        await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/posts/getPostComments/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })

            .then(response => response.json())
            .then(json => {
                setComments(json.comments);
            });

    }

    useEffect(() => {
        let postId = route.params.msg;
        setPostId(postId);
        setUserId(route.params.userID)
        getComments(postId)
    })

    return (
        <>
            <ScrollView>
                {comments.map((comment) => {
                    return (
                        <View style={styles.commentComponent}>
                            <View style={styles.metaData}>
                                {/* <View style={styles.commentThumb}> */}
                                <Image style={styles.commentImage} source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/getProfilePicture/${comment._id}` }}></Image>
                                {/* </View> */}
                                <View style={styles.commentWriter}>
                                    <Text style={styles.commentWriterName}>{comment.firstName + " " + comment.lastName}</Text>
                                    <Text>{comment.studyField}</Text>
                                </View>

                            </View>
                            <View>
                                <Text style={styles.comment}>
                                    {comment.comment}

                                </Text>
                            </View>
                        </View>


                    );

                })}



                <View style={styles.commentInputContainer}>
                    <TextInput
                        onChangeText={(text) => {
                            setNewComment(text);
                        }}
                        autoFocus={true}
                        autoCorrect={false}
                        placeholder="Last Name"
                        style={styles.textInputSignUp}

                    />


                    <Button
                        onPress={async () => {
                            let comment = newComment;
                            let _id = userId;
                            let data = {
                                _id,
                                postId,
                                comment,
                            }

                            console.log(data)


                            await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/posts/addComment`, {
                                method: 'PUT',
                                body: JSON.stringify(data),
                                headers: {
                                    "Content-type": "application/json; charset=UTF-8"
                                }
                            }).then(response => response.json())
                                .then(json => {
                                   console.log("COMMENT SEND SUCCESS"); 


                                });

















                            console.log(userId)
                        }}
                        style={styles.addCommentBtn} title='Add' />

                </View>

            </ScrollView>

        </>
    )
}


const styles = {
    commentComponent: {
        width: '100%',
        // height: 200,
        display: 'flex',
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 25
    },

    commentThumb: {
        paddingLeft: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        position: "relative"

    },

    commentImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        paddingLeft: -20,

    },

    metaData: {
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: "row",
        marginBottom: 10

    },

    commentWriter: {
        display: "flex",
        justifyContent: 'center',
        paddingLeft: 5,
        fontSize: 15,
    },

    commentWriterName: {
        fontWeight: "bold"

    },

    comment: {
        textAlign: 'justify',
        fontSize: 14,
    },

    commentInputContainer: {
        height: 50,
        width: '100%',
        // position: "absolute",
        backgroundColor: "white",

        marginBottom: 0,
        display: 'flex',
        flexDirection: 'row'
    },
    textInputSignUp: {
        height: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        width: '90%'

    },

    addCommentBtn: {
        width: '10%'
    }


}