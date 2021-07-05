import React, { ReactNode } from 'react';

import { View, Text, ImageBackground, FlatList, Alert, Share, Platform } from 'react-native';
import { Fontisto } from '@expo/vector-icons'
import BannerImg from '../../assets/banner.png'

import {styles} from './styles'
import { Background } from "../../components/Background";
import Header from "../../components/Header";
import { BorderlessButton } from 'react-native-gesture-handler';
import { theme } from '../../global/styles/theme';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentsProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { Loading } from '../../components/Loading';
import * as Linking from 'expo-linking'

interface AppointmentDetailsProps {
  children: ReactNode;
}

interface Params {
  guildSelected: AppointmentsProps
}

interface GuildWidget {
  id: string;
  name: string;
  instant_invite: string;
  members: {
    id: string;
    username: string;
    avatar_url: string;
    status: string;
  }[]
}

function AppointmentDetails({ children }: AppointmentDetailsProps) {
  const route = useRoute()
  const { guildSelected } = route.params as Params

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
  const [loading, setLoading] = useState(true)

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`)
      
      setWidget(response.data)
      setLoading(false)
    } catch {
      Alert.alert('Verifique as configurações do servidor')
    } finally {
      setLoading(false)
    }
  }

  function handleShareInvitation() {
    const message = Platform.OS === 'ios' ?
    `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite

    Share.share({
      message,
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {
    Linking.openURL(widget.instant_invite)
  }
  
  useEffect(() => {
    fetchGuildWidget()
  }, [])
  
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          guildSelected.guild.owner &&
          <BorderlessButton>
            <Fontisto 
              name="share"
              size={24}
              color={theme.colors.primary}
              onPress={handleShareInvitation}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{guildSelected.guild.name}</Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>
      
      { loading ? <Loading /> : (
        <>
          <ListHeader
            title="Jogadores"
            subtitle={`Total ${widget.members.length}`}
          />

          <FlatList
            data={widget.members}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Member data={item} />
            )}
            ItemSeparatorComponent={() => <ListDivider />}
            style={styles.members}
          />
        </>
      ) }
      
      { guildSelected.guild.owner && (
        <View style={styles.footer}>
          <ButtonIcon
            title="Entrar na partida"
            onPress={handleOpenGuild}
          />
        </View>
      ) }
    </Background>
  );
}

export default AppointmentDetails;
