// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // You can use MaterialIcons, FontAwesome, etc.
// import { Image } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// import HomeScreen from './HomeScreen';
// import FertilizerCalculator from './FertilizerCalculator';

// import PestsDiseasesScreen from './PestsDiseases';
// import CultivationTipsScreen from './CultivationTipsScreen'; // Add this import
// import PestAndDiseaseAlert from './PestAndDiseaseAlert';
// import GetMedicine from './GetMedicine';



// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();


// const StackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Home">
//            <Stack.Screen name="Home" component={HomeScreen} />

//       <Stack.Screen name="FertilizerCalculator" component={FertilizerCalculator} />
//       <Stack.Screen name="PestsDiseases" component={PestsDiseasesScreen} />
//       <Stack.Screen name="CultivationTips" component={CultivationTipsScreen} />
//       <Stack.Screen name="PestAndDiseaseAlert" component={PestAndDiseaseAlert} />
//       <Stack.Screen name="GetMedicine" component={GetMedicine} />

//     </Stack.Navigator>

    
//   );
// };

//   const App = () => {
//     return (
//       <NavigationContainer>
//         <Tab.Navigator
//           screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//               if (route.name === 'CropShield') {
//                 return (
//                   <Image
//                     source={require('C:\\Users\\PRERNA\\Downloads\\BEPROJECT\\BEPROJECT\\myapp\\assets\\logo.png')} // Replace with your logo path
//                     style={{
//                       width: focused ? 40 : 30, // Slightly larger when focused
//                       height: focused ? 40 : 30,
//                       resizeMode: 'contain',
//                     }}
//                   />
//                 );
//               }
//               let iconName;
  
//               switch (route.name) {
                
//                 case 'FertilizerCalculator':
//                   iconName = focused ? 'calculator' : 'calculator-outline';
//                   break;
//                 case 'PestsDiseases':
//                   iconName = focused ? 'bug' : 'bug-outline';
//                   break;
//                 case 'CultivationTips':
//                   iconName = focused ? 'leaf' : 'leaf-outline';
//                   break;
//                 default:
//                   iconName = 'alert-circle-outline';
//               }
  
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
           
//             tabBarActiveTintColor: 'green',
//             tabBarInactiveTintColor: 'gray',
//           })}
//         >
          
//           <Tab.Screen name="CropShield" component={StackNavigator} />
//           <Tab.Screen name="FertilizerCalculator" component={FertilizerCalculator} />
//           <Tab.Screen name="PestsDiseases" component={PestsDiseasesScreen} />
//           <Tab.Screen name="CultivationTips" component={CultivationTipsScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     );
//   };
  


// export default App;

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'; // You can use MaterialIcons, FontAwesome, etc.
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import FertilizerCalculator from './FertilizerCalculator';
import PestsDiseasesScreen from './PestsDiseases';
import CultivationTipsScreen from './CultivationTipsScreen';
import PestAndDiseaseAlert from './PestAndDiseaseAlert';
import GetMedicine from './GetMedicine';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home" iconName="home"
        component={HomeScreen}
        
      />
      <Stack.Screen name="FertilizerCalculator" component={FertilizerCalculator} />
      <Stack.Screen name="PestsDiseases" component={PestsDiseasesScreen} />
      <Stack.Screen name="CultivationTips" component={CultivationTipsScreen} />
      <Stack.Screen name="PestAndDiseaseAlert" component={PestAndDiseaseAlert} />
      <Stack.Screen name="GetMedicine" component={GetMedicine} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
           

            let iconName;

            switch (route.name) {

              case 'CropShield':  iconName = focused ? 'leaf' : 'leaf-outline';
              break;
              case 'FertilizerCalculator':
                iconName = focused ? 'calculator' : 'calculator-outline';
                break;
              case 'PestsDiseases':
                iconName = focused ? 'bug' : 'bug-outline';
                break;
              case 'CultivationTips':
                iconName = focused ? 'leaf' : 'leaf-outline';
                break;
              default:
                iconName = 'alert-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="CropShield"
          component={StackNavigator}
          options={{
            headerTitle: () => (
              <Image
                source={require('C:\\Users\\PRERNA\\Downloads\\BEPROJECT\\BEPROJECT\\myapp\\assets\\logo.png')} // Replace with your top logo path
                style={{
                  width: 210,
                  height: 150,
                  resizeMode: 'contain',
                }}
              />
            ),
            headerTitleAlign: 'center', // Center the logo in the header
            headerStyle: {
              height: 120, // Adjust the height of the header
            },
          }}
        />
        <Tab.Screen name="FertilizerCalculator" component={FertilizerCalculator} />
        <Tab.Screen name="PestsDiseases" component={PestsDiseasesScreen} />
        <Tab.Screen name="CultivationTips" component={CultivationTipsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;