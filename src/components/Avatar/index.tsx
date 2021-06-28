import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Image } from 'react-native'
import { theme } from '../../global/styles/theme'
import { styles } from './styles'

type Props = {
  urlImage: string
}

export function Avatar({ urlImage }: Props) {
  return (
    <View>
      <LinearGradient
        style={styles.container}
        colors={[theme.colors.secondary50, theme.colors.secondary70]}
      >
        <Image
          source={{ uri: urlImage }}
          style={styles.avatar}
        />
      </LinearGradient>
    </View>
  )
}