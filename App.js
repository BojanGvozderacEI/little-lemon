import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useReducer, useContext, useMemo, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding.js';
import ProfileScreen from './screens/Profile.js';
import SplashScreen from './screens/SplashScreen.js';
import { SCREEN_NAMES, USER_DATA_STORAGE_KEY } from './constants.js';
import { AuthContext } from './context/AuthContext.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'UPDATE_USER_DATA': {
        return {
          ...prevState,
          ...action.payload,
        };
      }
    }
  }, {});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem(USER_DATA_STORAGE_KEY);

        if (userData) {
          dispatch({ type: 'UPDATE_USER_DATA', payload: userData });
        }

      } catch {
        console.warn("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const authContext = useMemo(() => ({
    updateUserData: async (userData) => {
      dispatch({ type: 'UPDATE_USER_DATA', payload: userData });
    },
  }), []);

  if (loading) {
    return <SplashScreen />
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.firstName ? (
          <Stack.Screen name={SCREEN_NAMES.Profile} component={ProfileScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name={SCREEN_NAMES.Onboarding} component={OnboardingScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
