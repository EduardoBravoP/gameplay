import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { theme } from "../../global/styles/theme";

import { styles } from './styles'

type Props = {
  children: ReactNode
}

export function Background({ children }: Props) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[theme.colors.secondary80, theme.colors.secondary100]}
    >
      {children}
    </LinearGradient>
  )
}