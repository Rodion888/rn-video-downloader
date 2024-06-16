import { View, Image, Text, ImageSourcePropType } from 'react-native'
import { Tabs } from 'expo-router'
import { icons } from '../../constants';

import React from 'react';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

interface TabScreen {
  name: string;
  title: string;
  icon: ImageSourcePropType;
}

const tabScreens: TabScreen[] = [
  {
    name: "home",
    title: "Home",
    icon: icons.home,
  },
  {
    name: "bookmark",
    title: "Bookmark",
    icon: icons.bookmark,
  },
  {
    name: "create",
    title: "Create",
    icon: icons.plus,
  },
  {
    name: "profile",
    title: "Profile",
    icon: icons.profile,
  },
];

const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused} ? 'font-psemibold' ? 'font-pregular' text-xs`} style={{ color: color }}>{name}</Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        }
      }}>
        {tabScreens.map((screen: TabScreen, index: number) => (
          <Tabs.Screen
            key={index}
            name={screen.name}
            options={{
              title: screen.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={screen.icon}
                  color={color}
                  focused={focused}
                  name={screen.title}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  )
}

export default TabsLayout