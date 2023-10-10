import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";

import { ResizeMode } from 'expo-av'
import { Video } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
export default function TimeLine() {
  const route = useRoute();
  const navigation = useNavigation();
  let idd = "638e186a25d792882a1ef96a"

  const data = [
    {
      id: 1,
      title: 'Lorem ipsum dolor',
      time: '1 days a go',
      image: 'https://bootdey.com/image/400x200/5F9EA0/000000',
    },
    {
      id: 2,
      title: 'Sit amet, consectetuer',
      time: '2 minutes a go',
      image: 'https://bootdey.com/image/400x200/FF7F50/000000',
    },
    {
      id: 3,
      title: 'Dipiscing elit. Aenean ',
      time: '3 hour a go',
      image: 'https://bootdey.com/image/400x200/6495ED/000000',
    },
    {
      id: 4,
      title: 'Commodo ligula eget dolor.',
      time: '4 months a go',
      image: 'https://bootdey.com/image/400x200/8A2BE2/000000',
    },
    {
      id: 5,
      title: 'Aenean massa. Cum sociis',
      time: '5 weeks a go',
      image: 'https://bootdey.com/image/400x200/008B8B/000000',
    },
    {
      id: 6,
      title: 'Natoque penatibus et magnis',
      time: '6 year a go',
      image: 'https://bootdey.com/image/400x200/9932CC/000000',
    },
    {
      id: 7,
      title: 'Dis parturient montes, nascetur',
      time: '7 minutes a go',
      image: 'https://bootdey.com/image/400x200/00CED1/000000',
    },
    {
      id: 8,
      title: 'Ridiculus mus. Donec quam',
      time: '8 days a go',
      image: 'https://bootdey.com/image/400x200/1E90FF/000000',
    },
    {
      id: 9,
      title: 'Felis, ultricies nec, pellentesque',
      time: '9 minutes a go',
      image: 'https://bootdey.com/image/400x200/FF69B4/000000',
    },
  ]

  const [posts, setPosts] = useState([])
  const [userId, setUserId] = useState("");
  const video = React.useRef(null)


  async function getPosts(id) {
    await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/user/getTimelinePosts/${id}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })

      .then(response => response.json())
      .then(json => {
        console.log(json.postsResponse)
        setPosts(json.postsResponse);
      });

  }

  // here when the array brackets are blanks, it represents the componentDidMount
  // we can use useEffect for three functions (Mount,DidMount,Unmount)



  useEffect(() => {
    setUserId(route.params.userId);

    getPosts(route.params.userId)

  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={posts}
        keyExtractor={item => {
          return item.id
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />
        }}
        renderItem={post => {
          const item = post.item
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.channelName}</Text>
                  <Text style={styles.time}>{item.expertName}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  <Text style={styles.time}>{item.description}</Text>

                </View>
              </View>
              {/* 
              <Video
                ref={video}
                useNativeControls
                isLooping

                source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/api/posts/getPostMedia/${item._id}` }} />
 */}

              {/* 
              {
                item.mediaType == "img" ? <Image style={styles.cardImage} source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/api/posts/getPostMedia/${item._id}` }} /> :
                  <Video  source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/api/posts/getPostMedia/${item._id}` }} />
              }*/}



              <Image style={styles.cardImage} source={{ uri: `https://alumnibackend-fathifathallah.onrender.com/api/posts/getPostMedia/${item._id}` }} />

              <View style={styles.cardFooter}>
                <View style={styles.socialBarContainer}>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity
                      onPress=
                      {async () => {

                        let _id = userId;
                        let data = {
                          _id,
                          postId: item._id
                        }

                        console.log(data)



                        if (item.liked == true) {
                          // dislike  On Post
                          // console.log("INSIDE DISLIKE" + post._id)
                          await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/user/removeLike`, {
                            method: 'DELETE',
                            body: JSON.stringify(data),
                            headers: {
                              "Content-type": "application/json; charset=UTF-8"
                            }
                          }).then(response => response.json())
                            .then(json => {
                              console.log("REQ DONE DISLIKE")


                            });

                    

                          await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/user/getTimelinePosts/${item._id}`, {
                            method: 'GET',
                            headers: {
                              "Content-type": "application/json; charset=UTF-8"
                            }
                          })

                            .then(response => response.json())
                            .then(json => {
                              setPosts(json.postsResponse);
                            });

                        }
                        else {
                          // Put Like On Post
                          // console.log("INSIDE LIKE" + post._id)

                          await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/user/addLike`, {
                            method: 'PUT',
                            body: JSON.stringify(data),
                            headers: {
                              "Content-type": "application/json; charset=UTF-8"
                            }
                          }).then(response => response.json())
                            .then(json => {
                              console.log("REQ DONE LIKE")

                            });

                    

                          await fetch(`https://alumnibackend-fathifathallah.onrender.com/api/user/getTimelinePosts/${item._id}`, {
                            method: 'GET',
                            headers: {
                              "Content-type": "application/json; charset=UTF-8"
                            }
                          })

                            .then(response => response.json())
                            .then(json => {
                              setPosts(json.postsResponse);
                            });


                        }
                      }
                      }

                      style={styles.socialBarButton}>
                      <Image



                        style={styles.icon}
                        source={{ uri: 'https://img.icons8.com/color/70/000000/heart.png' }}
                      />
                      <Text
                        onPress={() => {
                          let msg = item._id;
                          navigation.navigate('Likes', {
                            msg
                          });
                        }
                        }
                        style={styles.socialBarLabel}>{item.likes}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity style={styles.socialBarButton}>
                      <Image
                        style={styles.icon}
                        source={{ uri: 'https://img.icons8.com/color/70/000000/comments.png' }}
                      />
                      <Text
                        onPress={() => {
                          let msg = item._id;
                          let userID = userId;
                          navigation.navigate('Comments', {
                            msg, userID
                          });
                        }
                        }

                        style={styles.socialBarLabel}>{item.comments}</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: '#E6E6E6',
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  time: {
    fontSize: 13,
    color: '#808080',
    marginTop: 5,
  },
  icon: {
    width: 25,
    height: 25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

// const styles = StyleSheet.create({
//     textFieldSignUpContainer: {
//         marginBottom: 20,
//         backgroundColor: "",
//     },

//     label: {
//         fontFamily: "poppins",
//         marginBottom: 5,
//     },
//     container: {
//         backgroundColor: "white",
//         padding: 15,
//         flex: 1,
//     },
//     textInputSignUp: {
//         height: "100%",
//     },
// });
