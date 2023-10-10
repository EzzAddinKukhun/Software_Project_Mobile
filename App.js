import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogIn from './Screens/LogIn'
import SignUp from './Screens/SignUp'
import TimeLine from './Screens/TimeLine';
import Sidebar from './Screens/Sidebar';
import Likes from './Screens/Likes';
import Comments from './Screens/Comments';
import Events from './Screens/Events';
import EventInformation from './Screens/EventInformation';
import Main from './Screens/Main';
import UserEvents from './Screens/UserEvents';
import BookedEvent from './Screens/BookedEvent';
import Profile from './Screens/Profile';
import Channels from './Screens/Channels';
import ChannelInfo from './Screens/ChannelInfo';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LogIn" options={{ title: "Log In" }} component={LogIn} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="TimeLine" component={TimeLine} />
          <Stack.Screen name="Likes" component={Likes} />
          <Stack.Screen name="Comments" component={Comments} />
          <Stack.Screen name="Events" component={Events} />
          <Stack.Screen name="Userevents" component={UserEvents} />
          <Stack.Screen name="EventInformation" component={EventInformation} />
          <Stack.Screen name="Bookedevents" component={BookedEvent} />
          <Stack.Screen name="Channels" component={Channels} />
          <Stack.Screen name="ChannelInfo" component={ChannelInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App; 