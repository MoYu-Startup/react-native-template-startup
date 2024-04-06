import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BootSplash from 'react-native-bootsplash';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://483e6b79f92e14f2dc71f87e5c5a004c@o1110694.ingest.us.sentry.io/4507038484791296',
});

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Error"
        onPress={() => {
          throw new Error('My first Sentry error!');
        }}
      />
      <Button
        title="nativeCrash"
        onPress={() => {
          Sentry.nativeCrash();
        }}
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer documentTitle={{ enabled: false }} onReady={() => BootSplash.hide()}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Sentry.wrap(App);
