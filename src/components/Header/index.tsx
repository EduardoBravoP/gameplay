import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { styles } from './styles' 
import { theme } from '../../global/styles/theme';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  title: string;
  action?: ReactNode
}

function Header({ title, action }: HeaderProps) {
  const navigation = useNavigation()
  
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary100, theme.colors.secondary40]}
    >
      <BorderlessButton onPress={() => navigation.goBack()}>
        <Feather
          name="arrow-left"
          size={24}
          color={theme.colors.heading}
        />
      </BorderlessButton>

      <Text style={styles.title}>
        { title }
      </Text>

      {
        action &&
        <View>
          { action }
        </View>
      }
    </LinearGradient>
  );
}

export default Header;
