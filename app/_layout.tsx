
import 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Stack, useNavigation } from 'expo-router';
import CustomHeader from '@/Components/CustomHeader';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};



export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen name="index" options={{
          header: () => <CustomHeader />,
        }} />
        <Stack.Screen 
          name="(modal)/filter"
          options={{
            presentation: 'modal',
            headerTitle: 'Filter',
            gestureEnabled: true,
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: Colors.lightGrey
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Ionicons name='close-outline' size={28} color={Colors.primary} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
