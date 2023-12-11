import React, {useEffect, useState, useRef} from 'react';
import {useNetStatusInfo} from '../../ultilities/customHooks/useNetStatusInfo';
import {usePushNotification} from '../../ultilities/customHooks/usePushNotification';
import {useSelector} from 'react-redux';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';

import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import styles from './styles';
import moment from 'moment';
import CalendarView from '../../components/CalendarView/CalendarView';
import Button from '../../components/Button/Button';
import colors from '../../constants/colors';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import pokeTypesData from '../../ultilities/pokemonData/pokemon_types';
import pokemon_alolan_variants from '../../ultilities/pokemonData/pokemon_alolan_variants';
import pokemon_galarian_variants from '../../ultilities/pokemonData/pokemon_galarian_variants';
import pokemon_hisuian_variants from '../../ultilities/pokemonData/pokemon_hisuian_variants';
import pokemon_mega_images from '../../ultilities/pokemonData/pokemon_mega_images';
import {horizontalScale, verticalScale} from '../../ultilities/scale';
import {toCamelCase, checkImageExists} from '../../ultilities/commonFunctions';
import CardView from '../../components/CardView/CardView';
import EventDisplayCard from '../../components/EventDisplayCard/EventDisplayCard';

const EventViewScreen = props => {
  const mockDataVal = {
    data: [
      {
        Links: 'https://leekduck.com/events/january-communitydayclassic2024/',
        Summary: 'January Community Day Classic',
        'Start DateTime': '2023-01-20 14:00:00',
        'End DateTime': '2023-01-20 17:00:00',
        Duration: ['2023-01-20'],
        preference: 1,
        'Img Src': [
          'https://leekduck.com/assets/img/events/cd-default.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_000.png',
        ],
        pokemonId: [''],
        type: [[]],
        Bonus: ['Increased Spawns', '???', '3-hour Incense*', '3-hour Lures**'],
        timeZone: 'LocalTime',
        Description:
          'Community Day Classic returns on January 20, 2024 from  2 pm to  5 pm. Stay tuned for the announcement of the featured Pokémon.',
      },
      {
        Links: 'https://leekduck.com/events/december-communityday2023/',
        Summary: 'December Community Day',
        'Start DateTime': '2023-12-16 10:00:00',
        'End DateTime': '2023-12-17 20:00:00',
        Duration: ['2023-12-16', '2023-12-17'],
        preference: 2,
        'Img Src': ['https://leekduck.com/assets/img/events/cd-default.jpg'],
        pokemonId: [],
        type: [[]],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'December Community Day is set for Saturday, December 16 and Sunday, December 17, 2023. Stay tuned for details.',
      },
      {
        Links:
          'https://leekduck.com/events/shadow-articuno-in-shadow-raids-november-2023-copy/',
        Summary: 'Shadow Articuno in Shadow Raids',
        'Start DateTime': '2023-11-04 10:00:00',
        'End DateTime': '2023-11-26 20:00:00',
        Duration: [
          '2023-11-04',
          '2023-11-05',
          '2023-11-06',
          '2023-11-07',
          '2023-11-08',
          '2023-11-09',
          '2023-11-10',
          '2023-11-11',
          '2023-11-12',
          '2023-11-13',
          '2023-11-14',
          '2023-11-15',
          '2023-11-16',
          '2023-11-17',
          '2023-11-18',
          '2023-11-19',
          '2023-11-20',
          '2023-11-21',
          '2023-11-22',
          '2023-11-23',
          '2023-11-24',
          '2023-11-25',
          '2023-11-26',
        ],
        preference: 23,
        'Img Src': [
          'https://leekduck.com/assets/img/events/events-default-img.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_144_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_144_00_shiny.png',
        ],
        pokemonId: ['144', '144'],
        type: [
          ['ice', 'flying'],
          ['ice', 'flying'],
        ],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'Shadow Articuno will return to Pokémon GO in Shadow Raids. You’ll be able to encounter Shiny Shadow Articuno—if you’re lucky!',
      },
      {
        Links: 'https://leekduck.com/events/february-communityday2024/',
        Summary: 'February Community Day',
        'Start DateTime': '2023-02-04 14:00:00',
        'End DateTime': '2023-02-04 17:00:00',
        Duration: ['2023-02-04'],
        preference: 1,
        'Img Src': ['https://leekduck.com/assets/img/events/cd-default.jpg'],
        pokemonId: [],
        type: [[]],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'February Community Day is on February 4, 2024 from  2 pm to  5 pm. Stay tuned for the announcement of the featured Pokémon.',
      },
      {
        Links: 'https://leekduck.com/events/party-up-event/',
        Summary: 'Party Up!',
        'Start DateTime': '2023-12-12 01:20:00',
        'End DateTime': '2023-12-12 20:00:00',
        Duration: [
          '2023-11-22',
          '2023-11-23',
          '2023-11-24',
          '2023-11-25',
          '2023-11-26',
          '2023-11-27',
        ],
        preference: 6,
        'Img Src': [
          'https://leekduck.com/assets/img/events/party-up-event.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pm906.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm909.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm912.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_574_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_574_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_577_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_577_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm755.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm755.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm915.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm915.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm919.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm921.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm928.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm938.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm58.fHISUIAN.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm58.fHISUIAN.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_299_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_299_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_557_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_557_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_599_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_599_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_112_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_279_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_282_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_282_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm962.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm962.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_639_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_639_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm115.fMEGA.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm115.fMEGA.s.icon.png',
        ],
        pokemonId: [
          '906',
          '909',
          '912',
          '574',
          '574',
          '577',
          '577',
          '755',
          '755',
          '915',
          '915',
          '919',
          '921',
          '928',
          '938',
          '58',
          '58',
          '299',
          '299',
          '557',
          '557',
          '599',
          '599',
          '112',
          '279',
          '282',
          '282',
          '962',
          '962',
          '639',
          '639',
          '115',
          '115',
        ],
        type: [
          ['grass'],
          ['fire'],
          ['water'],
          ['psychic'],
          ['psychic'],
          ['psychic'],
          ['psychic'],
          ['grass', 'fairy'],
          ['grass', 'fairy'],
          ['normal'],
          ['normal'],
          ['bug'],
          ['electric'],
          ['grass', 'normal'],
          ['electric'],
          ['fire', 'rock'],
          ['fire', 'rock'],
          ['rock'],
          ['rock'],
          ['bug', 'rock'],
          ['bug', 'rock'],
          ['steel'],
          ['steel'],
          ['ground', 'rock'],
          ['water', 'flying'],
          ['psychic', 'fairy'],
          ['psychic', 'fairy'],
          ['flying', 'dark'],
          ['flying', 'dark'],
          ['rock', 'fighting'],
          ['rock', 'fighting'],
          ['normal'],
          ['normal'],
        ],
        Bonus: [
          'Up to five Special Trades can be made a day',
          'Two additional Candy for trading Pokémon',
          'Trainers level 31 and up are guaranteed to recieve Candy XL for trading Pokémon',
          '2x XP for winning Raid Battles',
        ],
        timeZone: 'LocalTime',
        Description:
          'Let’s GO party it up!  It’s time to celebrate the end of the Season with Party Play.',
      },
      {
        Links: 'https://leekduck.com/events/season-12-adventures-abound/',
        Summary: 'Adventures Abound',
        'Start DateTime': '2023-09-01 10:00:00',
        'End DateTime': '2023-12-01 10:00:00',
        Duration: [
          '2023-09-01',
          '2023-09-02',
          '2023-09-03',
          '2023-09-04',
          '2023-09-05',
          '2023-09-06',
          '2023-09-07',
          '2023-09-08',
          '2023-09-09',
          '2023-09-10',
          '2023-09-11',
          '2023-09-12',
          '2023-09-13',
          '2023-09-14',
          '2023-09-15',
          '2023-09-16',
          '2023-09-17',
          '2023-09-18',
          '2023-09-19',
          '2023-09-20',
          '2023-09-21',
          '2023-09-22',
          '2023-09-23',
          '2023-09-24',
          '2023-09-25',
          '2023-09-26',
          '2023-09-27',
          '2023-09-28',
          '2023-09-29',
          '2023-09-30',
          '2023-10-01',
          '2023-10-02',
          '2023-10-03',
          '2023-10-04',
          '2023-10-05',
          '2023-10-06',
          '2023-10-07',
          '2023-10-08',
          '2023-10-09',
          '2023-10-10',
          '2023-10-11',
          '2023-10-12',
          '2023-10-13',
          '2023-10-14',
          '2023-10-15',
          '2023-10-16',
          '2023-10-17',
          '2023-10-18',
          '2023-10-19',
          '2023-10-20',
          '2023-10-21',
          '2023-10-22',
          '2023-10-23',
          '2023-10-24',
          '2023-10-25',
          '2023-10-26',
          '2023-10-27',
          '2023-10-28',
          '2023-10-29',
          '2023-10-30',
          '2023-10-31',
          '2023-11-01',
          '2023-11-02',
          '2023-11-03',
          '2023-11-04',
          '2023-11-05',
          '2023-11-06',
          '2023-11-07',
          '2023-11-08',
          '2023-11-09',
          '2023-11-10',
          '2023-11-11',
          '2023-11-12',
          '2023-11-13',
          '2023-11-14',
          '2023-11-15',
          '2023-11-16',
          '2023-11-17',
          '2023-11-18',
          '2023-11-19',
          '2023-11-20',
          '2023-11-21',
          '2023-11-22',
          '2023-11-23',
          '2023-11-24',
          '2023-11-25',
          '2023-11-26',
          '2023-11-27',
          '2023-11-28',
          '2023-11-29',
          '2023-11-30',
          '2023-12-01',
        ],
        preference: 92,
        'Img Src': [
          'https://leekduck.com/assets/img/events/season-12-adventures-abound-2.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pm906.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm907.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm908.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm909.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm910.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm911.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm912.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm913.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm914.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm915.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm915.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm916.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm916.fFEMALE.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm919.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm920.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm921.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm922.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm923.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm962.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm962.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm996.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm997.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm998.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_083_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_083_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_246_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_246_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_302_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_302_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_371_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_371_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm676.fNATURAL.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm676.fNATURAL.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_704_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_704_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_094_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_094_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_316_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_316_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_374_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_374_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_520_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_559_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_559_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_574_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_574_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_702_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_702_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_113_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_113_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_397_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_428_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_428_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_453_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_453_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_616_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_616_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm755.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm755.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm765.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm765.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_095_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_095_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_306_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_306_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_554_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_554_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_622_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_622_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_662_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm777.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_080_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_080_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_090_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_090_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_279_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_588_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_588_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm751.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm751.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm769.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_152_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_152_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_155_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_155_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_158_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_158_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_585_13.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm696.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm696.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm698.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm698.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_495_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_495_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_498_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_498_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_501_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_501_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_564_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_564_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_566_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_566_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_585_11.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_633_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_633_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_170_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_170_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_173_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_173_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_174_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_174_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_307_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_307_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm636.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm753.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm753.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm767.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm767.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_066_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_066_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_108_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_108_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_207_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_207_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_433_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_438_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_438_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm747.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_037_61.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_037_61_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_052_61.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_052_61_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_052_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_052_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm58.fHISUIAN.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm58.fHISUIAN.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_077_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_077_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_079_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_079_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm100.fHISUIAN.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm211.fHISUIAN.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm215.fHISUIAN.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_263_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_263_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_554_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_554_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_618_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_618_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm703.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm703.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm744.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm744.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm782.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_408_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_408_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_410_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_440_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_440_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_446_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_446_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_458_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_458_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_594_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_594_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_147_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_147_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_443_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_443_00_shiny.png',
        ],
        pokemonId: [
          '906',
          '907',
          '908',
          '909',
          '910',
          '911',
          '912',
          '913',
          '914',
          '915',
          '915',
          '916',
          '916',
          '919',
          '920',
          '921',
          '922',
          '923',
          '962',
          '962',
          '996',
          '997',
          '998',
          '83',
          '83',
          '246',
          '246',
          '302',
          '302',
          '371',
          '371',
          '676',
          '676',
          '704',
          '704',
          '94',
          '94',
          '316',
          '316',
          '374',
          '374',
          '520',
          '559',
          '559',
          '574',
          '574',
          '702',
          '702',
          '113',
          '113',
          '397',
          '428',
          '428',
          '453',
          '453',
          '616',
          '616',
          '755',
          '755',
          '765',
          '765',
          '95',
          '95',
          '306',
          '306',
          '554',
          '554',
          '622',
          '622',
          '662',
          '777',
          '80',
          '80',
          '90',
          '90',
          '279',
          '588',
          '588',
          '751',
          '751',
          '769',
          '152',
          '152',
          '155',
          '155',
          '158',
          '158',
          '585',
          '696',
          '696',
          '698',
          '698',
          '495',
          '495',
          '498',
          '498',
          '501',
          '501',
          '564',
          '564',
          '566',
          '566',
          '585',
          '633',
          '633',
          '170',
          '170',
          '173',
          '173',
          '174',
          '174',
          '307',
          '307',
          '636',
          '753',
          '753',
          '767',
          '767',
          '66',
          '66',
          '108',
          '108',
          '207',
          '207',
          '433',
          '438',
          '438',
          '747',
          '37',
          '37',
          '52',
          '52',
          '52',
          '52',
          '58',
          '58',
          '77',
          '77',
          '79',
          '79',
          '100',
          '211',
          '215',
          '263',
          '263',
          '554',
          '554',
          '618',
          '618',
          '703',
          '703',
          '744',
          '744',
          '782',
          '408',
          '408',
          '410',
          '410',
          '440',
          '440',
          '446',
          '446',
          '458',
          '458',
          '594',
          '594',
          '147',
          '147',
          '443',
          '443',
        ],
        type: [
          ['grass'],
          ['grass'],
          ['grass', 'dark'],
          ['fire'],
          ['fire'],
          ['fire', 'ghost'],
          ['water'],
          ['water'],
          ['water', 'fighting'],
          ['normal'],
          ['normal'],
          ['normal'],
          ['normal'],
          ['bug'],
          ['bug', 'dark'],
          ['electric'],
          ['electric', 'fighting'],
          ['electric', 'fighting'],
          ['flying', 'dark'],
          ['flying', 'dark'],
          ['dragon', 'ice'],
          ['dragon', 'ice'],
          ['dragon', 'ice'],
          ['normal', 'flying'],
          ['normal', 'flying'],
          ['rock', 'ground'],
          ['rock', 'ground'],
          ['dark', 'ghost'],
          ['dark', 'ghost'],
          ['dragon'],
          ['dragon'],
          ['normal'],
          ['normal'],
          ['dragon'],
          ['dragon'],
          ['ghost', 'poison'],
          ['ghost', 'poison'],
          ['poison'],
          ['poison'],
          ['steel', 'psychic'],
          ['steel', 'psychic'],
          ['normal', 'flying'],
          ['dark', 'fighting'],
          ['dark', 'fighting'],
          ['psychic'],
          ['psychic'],
          ['electric', 'fairy'],
          ['electric', 'fairy'],
          ['normal'],
          ['normal'],
          ['normal', 'flying'],
          ['normal'],
          ['normal'],
          ['poison', 'fighting'],
          ['poison', 'fighting'],
          ['bug'],
          ['bug'],
          ['grass', 'fairy'],
          ['grass', 'fairy'],
          ['normal', 'psychic'],
          ['normal', 'psychic'],
          ['rock', 'ground'],
          ['rock', 'ground'],
          ['steel', 'rock'],
          ['steel', 'rock'],
          ['fire'],
          ['fire'],
          ['ground', 'ghost'],
          ['ground', 'ghost'],
          ['fire', 'flying'],
          ['electric', 'steel'],
          ['water', 'psychic'],
          ['water', 'psychic'],
          ['water'],
          ['water'],
          ['water', 'flying'],
          ['bug'],
          ['bug'],
          ['water', 'bug'],
          ['water', 'bug'],
          ['ghost', 'ground'],
          ['grass'],
          ['grass'],
          ['fire'],
          ['fire'],
          ['water'],
          ['water'],
          ['normal', 'grass'],
          ['rock', 'dragon'],
          ['rock', 'dragon'],
          ['rock', 'ice'],
          ['rock', 'ice'],
          ['grass'],
          ['grass'],
          ['fire'],
          ['fire'],
          ['water'],
          ['water'],
          ['water', 'rock'],
          ['water', 'rock'],
          ['rock', 'flying'],
          ['rock', 'flying'],
          ['normal', 'grass'],
          ['dark', 'dragon'],
          ['dark', 'dragon'],
          ['water', 'electric'],
          ['water', 'electric'],
          ['fairy'],
          ['fairy'],
          ['normal', 'fairy'],
          ['normal', 'fairy'],
          ['fighting', 'psychic'],
          ['fighting', 'psychic'],
          ['bug', 'fire'],
          ['grass'],
          ['grass'],
          ['bug', 'water'],
          ['bug', 'water'],
          ['fighting'],
          ['fighting'],
          ['normal'],
          ['normal'],
          ['ground', 'flying'],
          ['ground', 'flying'],
          ['psychic'],
          ['rock'],
          ['rock'],
          ['poison', 'water'],
          ['ice'],
          ['ice'],
          ['dark'],
          ['dark'],
          ['normal'],
          ['normal'],
          ['fire', 'rock'],
          ['fire', 'rock'],
          ['fire'],
          ['fire'],
          ['water', 'psychic'],
          ['water', 'psychic'],
          ['electric', 'grass'],
          ['dark', 'poison'],
          ['fighting', 'poison'],
          ['normal'],
          ['normal'],
          ['fire'],
          ['fire'],
          ['ground', 'electric'],
          ['ground', 'electric'],
          ['rock', 'fairy'],
          ['rock', 'fairy'],
          ['rock'],
          ['rock'],
          ['dragon'],
          ['rock'],
          ['rock'],
          ['rock', 'steel'],
          ['rock', 'steel'],
          ['normal'],
          ['normal'],
          ['normal'],
          ['normal'],
          ['water', 'flying'],
          ['water', 'flying'],
          ['water'],
          ['water'],
          ['dragon'],
          ['dragon'],
          ['dragon', 'ground'],
          ['dragon', 'ground'],
        ],
        Bonus: [
          'Trainers can open up to 40 Gifts daily',
          'Trainers can hold up to 40 Gifts in their Item Bag',
          'Increased damage when participating in raids with a friend',
          '1.5x XP from going up a Friendship level',
        ],
        timeZone: 'LocalTime',
        Description:
          'Welcome to the next Pokémon GO Season: Adventures Abound!',
      },
      {
        Links: 'https://leekduck.com/events/january-communityday2024/',
        Summary: 'January Community Day',
        'Start DateTime': '2023-01-06 14:00:00',
        'End DateTime': '2023-01-06 17:00:00',
        Duration: ['2023-01-06'],
        preference: 1,
        'Img Src': ['https://leekduck.com/assets/img/events/cd-default.jpg'],
        pokemonId: [],
        type: [[]],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'January Community Day is on January 6, 2024 from  2 pm to  5 pm. Stay tuned for the announcement of the featured Pokémon.',
      },
      {
        Links:
          'https://leekduck.com/events/pokemon-showcase-sprigatito-fuecoco-quaxly-2023-11-26/',
        Summary: 'Sprigatito',
        'Start DateTime': '2023-11-26 10:00:00',
        'End DateTime': '2023-11-27 20:00:00',
        Duration: ['2023-11-26', '2023-11-27'],
        preference: 2,
        'Img Src': [
          'https://leekduck.com/assets/img/events/pokestop-showcases-default.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pm906.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm909.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm912.icon.png',
        ],
        pokemonId: ['906', '909', '912'],
        type: [['grass'], ['fire'], ['water']],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'There will be PokéStop Showcases featuring Sprigatito, Fuecoco, and Quaxly. Top the leaderboard to win rewards including Premium Items!',
      },
      {
        Links:
          'https://leekduck.com/events/season-12-adventures-abound-research-breakthrough/',
        Summary: 'Adventures Abound Research Breakthrough',
        'Start DateTime': '2023-09-01 20:00:00',
        'End DateTime': '2023-12-01 21:00:00',
        Duration: [
          '2023-09-01',
          '2023-09-02',
          '2023-09-03',
          '2023-09-04',
          '2023-09-05',
          '2023-09-06',
          '2023-09-07',
          '2023-09-08',
          '2023-09-09',
          '2023-09-10',
          '2023-09-11',
          '2023-09-12',
          '2023-09-13',
          '2023-09-14',
          '2023-09-15',
          '2023-09-16',
          '2023-09-17',
          '2023-09-18',
          '2023-09-19',
          '2023-09-20',
          '2023-09-21',
          '2023-09-22',
          '2023-09-23',
          '2023-09-24',
          '2023-09-25',
          '2023-09-26',
          '2023-09-27',
          '2023-09-28',
          '2023-09-29',
          '2023-09-30',
          '2023-10-01',
          '2023-10-02',
          '2023-10-03',
          '2023-10-04',
          '2023-10-05',
          '2023-10-06',
          '2023-10-07',
          '2023-10-08',
          '2023-10-09',
          '2023-10-10',
          '2023-10-11',
          '2023-10-12',
          '2023-10-13',
          '2023-10-14',
          '2023-10-15',
          '2023-10-16',
          '2023-10-17',
          '2023-10-18',
          '2023-10-19',
          '2023-10-20',
          '2023-10-21',
          '2023-10-22',
          '2023-10-23',
          '2023-10-24',
          '2023-10-25',
          '2023-10-26',
          '2023-10-27',
          '2023-10-28',
          '2023-10-29',
          '2023-10-30',
          '2023-10-31',
          '2023-11-01',
          '2023-11-02',
          '2023-11-03',
          '2023-11-04',
          '2023-11-05',
          '2023-11-06',
          '2023-11-07',
          '2023-11-08',
          '2023-11-09',
          '2023-11-10',
          '2023-11-11',
          '2023-11-12',
          '2023-11-13',
          '2023-11-14',
          '2023-11-15',
          '2023-11-16',
          '2023-11-17',
          '2023-11-18',
          '2023-11-19',
          '2023-11-20',
          '2023-11-21',
          '2023-11-22',
          '2023-11-23',
          '2023-11-24',
          '2023-11-25',
          '2023-11-26',
          '2023-11-27',
          '2023-11-28',
          '2023-11-29',
          '2023-11-30',
          '2023-12-01',
        ],
        preference: 92,
        'Img Src': [
          'https://leekduck.com/assets/img/events/SummerResearchBreakthrough.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_083_31.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_083_31_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_246_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_246_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_302_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_302_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_371_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_371_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm676.fNATURAL.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm676.fNATURAL.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_704_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_704_00_shiny.png',
        ],
        pokemonId: [
          '83',
          '83',
          '246',
          '246',
          '302',
          '302',
          '371',
          '371',
          '676',
          '676',
          '704',
          '704',
        ],
        type: [
          ['normal', 'flying'],
          ['normal', 'flying'],
          ['rock', 'ground'],
          ['rock', 'ground'],
          ['dark', 'ghost'],
          ['dark', 'ghost'],
          ['dragon'],
          ['dragon'],
          ['normal'],
          ['normal'],
          ['dragon'],
          ['dragon'],
        ],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'During Adventures Abound, Trainers will encounter one of the six Pokémon in Research Breakthrough encounters.',
      },
      {
        Links:
          'https://leekduck.com/events/gbl-adventures_abound-great_league-ultra_league-master-league-2/',
        Summary: 'Great League',
        'Start DateTime': '2023-11-24 21:00:00',
        'End DateTime': '2023-12-01 21:00:00',
        Duration: [
          '2023-11-24',
          '2023-11-25',
          '2023-11-26',
          '2023-11-27',
          '2023-11-28',
          '2023-11-29',
          '2023-11-30',
          '2023-12-01',
        ],
        preference: 8,
        'Img Src': [
          'https://leekduck.com/assets/img/events/go-battle-league-season-16-adventures-abound.jpg',
        ],
        pokemonId: [],
        type: [[]],
        Bonus: [],
        timeZone: 'CUT',
        Description:
          'The Great League, Ultra League, and Master League will run from November 24, 2023, at 1:00 p.m. to December 1, 2023, at 1:00 p.m. PT.',
      },
      {
        Links:
          'https://leekduck.com/events/pokemon-showcase-lechonk-2023-11-28/',
        Summary: 'Lechonk PokStop Showcases',
        'Start DateTime': '2023-11-28 10:00:00',
        'End DateTime': '2023-11-28 01:10:00',
        Duration: ['2023-11-28'],
        preference: 1,
        'Img Src': [
          'https://leekduck.com/assets/img/events/pokestop-showcases-default.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pm915.icon.png',
        ],
        pokemonId: ['915'],
        type: [['normal']],
        Bonus: [],
        timeZone: 'CUT',
        Description:
          'There will be PokéStop Showcases featuring Lechonk. Top the leaderboard to win rewards including Premium Items!',
      },
      {
        Links:
          'https://leekduck.com/events/terrakion-in-5-star-raid-battles-november-2023/',
        Summary: 'Terrakion in 5-star Raid Battles',
        'Start DateTime': '2023-11-23 10:00:00',
        'End DateTime': '2023-11-30 10:00:00',
        Duration: [
          '2023-11-23',
          '2023-11-24',
          '2023-11-25',
          '2023-11-26',
          '2023-11-27',
          '2023-11-28',
          '2023-11-29',
          '2023-11-30',
        ],
        preference: 8,
        'Img Src': [
          'https://leekduck.com/assets/img/events/terrakion2.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_639_00.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_639_00_shiny.png',
        ],
        pokemonId: ['639', '639'],
        type: [
          ['rock', 'fighting'],
          ['rock', 'fighting'],
        ],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'Terrakion will be in five-star raid battles from November 23, 2023 to November 30, 2023.',
      },
      {
        Links: 'https://leekduck.com/events/raidhour20231129/',
        Summary: 'Terrakion Raid Hour',
        'Start DateTime': '2023-11-29 18:00:00',
        'End DateTime': '2023-11-29 19:00:00',
        Duration: ['2023-11-29'],
        preference: 1,
        'Img Src': ['https://leekduck.com/assets/img/events/raidhour.jpg'],
        pokemonId: [],
        type: [[]],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'A Raid Hour featuring Terrakion is scheduled from 6 to 7 pm Local Time. During this hour there will be an increased number of five-star Raids.',
      },
      {
        Links: 'https://leekduck.com/events/pokemonspotlighthour2023-11-28/',
        Summary: 'Lechonk Spotlight Hour',
        'Start DateTime': '2023-11-28 18:00:00',
        'End DateTime': '2023-11-28 01:11:00',
        Duration: ['2023-11-28'],
        preference: 1,
        'Img Src': [
          'https://leekduck.com/assets/img/events/pokemonspotlighthour.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pm915.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm915.s.icon.png',
        ],
        pokemonId: ['915', '915'],
        type: [['normal'], ['normal']],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'Pokémon Spotlight Hour will feature a different Pokémon and special bonus for one hour at 6:00 p.m. local time on Tuesday during the month of November.',
      },
      {
        Links:
          'https://leekduck.com/events/mega-kangaskhan-in-mega-raids-november-2023/',
        Summary: 'Mega Kangaskhan in Mega Raids',
        'Start DateTime': '2023-11-16 10:00:00',
        'End DateTime': '2023-11-30 10:00:00',
        Duration: [
          '2023-11-16',
          '2023-11-17',
          '2023-11-18',
          '2023-11-19',
          '2023-11-20',
          '2023-11-21',
          '2023-11-22',
          '2023-11-23',
          '2023-11-24',
          '2023-11-25',
          '2023-11-26',
          '2023-11-27',
          '2023-11-28',
          '2023-11-29',
          '2023-11-30',
        ],
        preference: 15,
        'Img Src': [
          'https://leekduck.com/assets/img/events/mega-default.jpg',
          'https://leekduck.com/assets/img/pokemon_icons/pm115.fMEGA.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pm115.fMEGA.s.icon.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_115_00_shiny.png',
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_115_00.png',
        ],
        pokemonId: ['115', '115', '115', '115'],
        type: [['normal'], ['normal'], ['normal'], ['normal']],
        Bonus: [],
        timeZone: 'LocalTime',
        Description:
          'Mega Kangaskhan returns to Mega Raids on November 16, 2023, at 10 am local time.',
      },
    ],
  };

  const {navigation} = props;
  const selectedDate = props?.route?.params?.selectedDate;

  let listViewRef = useRef();
  const calanderRef = useRef();

  const {networkState} = useNetStatusInfo();

  const {sendLocalNotificationWithSound, localNotif} =
    usePushNotification(navigation);

  // const loadedEventJSONData = useSelector(
  //   state => state?.eventDataReducer?.eventdataload,
  // );

  const loadedEventJSONData = mockDataVal;

  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);
  const [eventsData, setEventsData] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const [modalImageIndex, setModalImageIndex] = useState(0);

  const [pokemonName, setPokemonName] = useState('');
  const [pokemonNameDisplay, setPokemonNameDisplay] = useState('');
  const [pokemonType, setPokemonType] = useState([]);

  const [showLoader, setShowLoader] = useState(true);

  const [gridViewStatus, setGridViewStatus] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  const modalTextColorStyle = {
    color: darkModeValue ? colors.white : colors.purple,
  };

  const modalBonusBackgroundStyle = {
    backgroundColor: darkModeValue ? colors.purple : colors.white,
  };

  const datVal = modalData?.['Start DateTime']?.split(' ');
  const dateLength = datVal?.length;

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    const intervalId = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const displayableEvents = loadedEventJSONData?.data.filter(data =>
      data?.Duration?.includes(moment(selectedStartDate).format('YYYY-MM-DD')),
    );
    const sortedArry =
      sortByKey(displayableEvents, 'preference') ?? displayableEvents;
    setEventsData(sortedArry);

    if (selectedStartDate === null) {
      setEventsData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartDate]);

  useEffect(() => {
    // console.log('TODAY-EVENTS2', JSON.stringify(eventsData));
    let notificationTitleString = '';
    eventsData?.map((evDat, evIdx) => {
      // console.log('TODAY-EVENTS2 - ', evIdx, ' - EVNTS2', evDat);

      if (evDat?.Summary.toLowerCase().includes('spotlight')) {
        notificationTitleString = 'Spotlight';
      } else if (evDat?.Summary?.toLowerCase().includes('community day')) {
        notificationTitleString = 'Community day';
      } else {
        notificationTitleString = 'Event Alert';
      }

      if (
        moment(currentTime).format('YYYY-MM-DD HH:mm:ss') ===
        evDat?.['Start DateTime']
      ) {
        if (Platform.OS === 'ios') {
          sendLocalNotificationWithSound(
            notificationTitleString,
            evDat?.Summary,
            evDat?.Description,
            evDat?.['Img Src']?.[0],
          );
        } else if (Platform.OS === 'android') {
          localNotif(
            notificationTitleString,
            evDat?.Summary,
            evDat?.Description,
            evDat?.['Img Src']?.[0],
          );
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  useEffect(() => {
    let pokeName;
    let pokemonMegaType;

    const megaCategory = [
      '_51.png',
      '_52.png',
      '_51_shiny.png',
      '_52_shiny.png',
      'fMEGA.icon.png',
      'fMEGA.s.icon.png',
    ];

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes('pokemon_icons'),
    );

    megaCategory.map(dat => {
      if (modalImages?.[modalImageIndex]?.includes(dat)) {
        pokemonMegaType = true;
      }
    });

    fetch(
      `https://pokeapi.co/api/v2/pokemon/${modalData?.pokemonId?.[modalImageIndex]}`,
    ).then(response => {
      response.json().then(res => {
        pokeName = res?.name;
        setPokemonNameDisplay(pokeName);
        if (pokemonMegaType) {
          setPokemonName(pokeName);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalImageIndex, modalVisible, gridViewStatus]);

  useEffect(() => {
    setGridViewStatus(false);
  }, [modalVisible]);

  const showModal = () => {
    setModalVisible(true);
    setModalImageIndex(0);
  };

  const hideModal = () => {
    setModalVisible(false);
    setModalImageIndex(0);
  };

  const leftButtonHandler = (id, modalImages) => {
    //TODO: Need to fix this limit of 30 items and make scrolling smooth for what so ever number of images we have
    //TODO: Try to use gridIndex and modalIndex, whenever gridImage is selected, trigger a useEffect which sets modalIndex
    //TODO: Then scrollToIndex(modalIndex). Hopefully this can solve this issue
    /*
      if (modalImages?.length <= 30) {
        listViewRef.current.scrollToIndex({animated: true, index: id});
      }
    */
  };

  const rightButtonHandler = (id, modalImages) => {
    //TODO: Need to fix this limit of 30 items and make scrolling smooth for what so ever number of images we have
    /*
      if (modalImages?.length <= 30) {
        listViewRef.current.scrollToIndex({animated: true, index: id});
      }
    */
  };

  const renderItem = ({item}) => {
    const specialCase =
      item?.Summary.toLowerCase().includes('spotlight') ||
      item?.Summary?.toLowerCase().includes('community day');

    // console.log('CHECKKKKKKK', item?.Summary, specialCase);
    return (
      <View style={styles.eventsList}>
        <TouchableOpacity
          onPress={() => {
            let pokeType;
            showModal();
            setModalData(item);

            pokeType = item?.type;
            setPokemonType(pokeType);
          }}>
          <CardView
            innerView={eventCardContainer(item)}
            style={[
              styles.cardInnerStyling,
              {
                borderWidth: specialCase ? 2 : 0,
                borderColor: specialCase ? colors.goldColor : null,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyListComponent = () => {
    return (
      <View
        style={[commonStyling.absoluteCenterStyling, styles.topPaddingStyle]}>
        <Image
          source={imagePaths.calendarIllustration4}
          height={1}
          width={1}
          style={styles.emptyListImage}
          resizeMode={'contain'}
        />
        <Text
          style={[
            styles.emptyListText,
            {color: darkModeValue ? colors.white : colors.secondaryColor},
          ]}>
          {strings.no_event_string}
        </Text>
      </View>
    );
  };

  const renderSelectDatePromptComponent = () => {
    return (
      <View
        style={[commonStyling.absoluteCenterStyling, styles.topPaddingStyle]}>
        <Image
          source={imagePaths.noDateSelectedPromptImage1}
          height={1}
          width={1}
          style={styles.selectDatePromptImage}
          resizeMode={'contain'}
        />
        <Text
          style={[
            styles.emptyListText,
            {color: darkModeValue ? colors.white : colors.secondaryColor},
          ]}>
          {strings.select_date_prompt}
        </Text>
      </View>
    );
  };

  const eventCardContainer = item => {
    let eventCompletionStatus;
    let currentDate = new Date();
    let date2 = new Date(item?.['End DateTime']);

    if (currentDate > date2) {
      eventCompletionStatus = true;
    } else if (currentDate < date2) {
      eventCompletionStatus = false;
    } else {
      eventCompletionStatus = false;
    }

    return (
      <EventDisplayCard
        item={item}
        eventCompletionStatus={eventCompletionStatus}
      />
    );
  };

  const eventBonusesDisplay = () => {
    return (
      <>
        {modalData?.Bonus?.length > 0 ? (
          <FlatList
            contentContainerStyle={styles.descriptionDataContentView}
            data={modalData?.Bonus}
            keyExtractor={item => item}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.descriptionView,
                    {
                      backgroundColor: darkModeValue
                        ? colors.purple
                        : colors.white,
                    },
                  ]}>
                  <Text style={[styles.descriptionText, modalTextColorStyle]}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        ) : null}
      </>
    );
  };

  const eventTimeDisplay = () => {
    return (
      <>
        <Text style={[styles.eventTimeStyle, modalTextColorStyle]}>
          {strings.event_ranges_from}
        </Text>
        {dateLength === 2 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Starts: ${moment(modalData?.['Start DateTime']).format(
              'DD/MM/YYYY',
            )}, ${moment(modalData?.['Start DateTime']).format('LT')} ${
              modalData?.timeZone
            }`}
          </Text>
        ) : null}
        {dateLength === 1 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Starts: ${moment(modalData?.['Start DateTime']).format(
              'DD/MM/YYYY',
            )}`}
          </Text>
        ) : null}
        {dateLength === 2 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Ends: ${moment(modalData?.['End DateTime']).format(
              'DD/MM/YYYY',
            )}, ${moment(modalData?.['End DateTime']).format('LT')} ${
              modalData?.timeZone
            }`}
          </Text>
        ) : null}
        {dateLength === 1 ? (
          <Text style={[styles.modalDescriptionStyle, modalTextColorStyle]}>
            {`Ends: ${moment(modalData?.['End DateTime']).format(
              'DD/MM/YYYY',
            )}`}
          </Text>
        ) : null}
      </>
    );
  };

  const modalCloseButton = () => {
    return (
      <Button
        buttonStyle={[styles.buttonStyle, styles.viewButton]}
        buttonTextStyle={[styles.viewButtonText]}
        onPress={() => {
          hideModal();
        }}
        buttonText={strings.close}
      />
    );
  };

  /* CAROUSAL SECTION */
  /**Contents to pass:
   * OnPress Right
   * Disable right
   * Onpress left
   * Disable left
   * Card View
   * Card data
   * Pagination Data
   * Pagination Condition
   */

  const leftChevronIcon = modalImages => {
    return (
      <>
        {modalImages?.length > 1 ? (
          <TouchableOpacity
            onPress={() => {
              if (modalImageIndex > 0) {
                const tempIndex = modalImageIndex - 1;
                setModalImageIndex(tempIndex);
                leftButtonHandler(tempIndex, modalImages);
              }
            }}
            disabled={modalImageIndex > 0 ? false : true}>
            <Image
              source={imagePaths.leftChevronIcon}
              height={1}
              width={1}
              style={[
                styles.chevronIcon,
                {
                  opacity: modalImageIndex > 0 ? 1 : 0.5,
                },
              ]}
            />
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const rightChevronIcon = modalImages => {
    return (
      <>
        {modalImages?.length > 1 ? (
          <TouchableOpacity
            onPress={() => {
              if (modalImageIndex < modalImages.length) {
                const tempIndex = modalImageIndex + 1;
                setModalImageIndex(tempIndex);
                rightButtonHandler(tempIndex, modalImages);
              }
            }}
            disabled={modalImageIndex < modalImages.length - 1 ? false : true}>
            <Image
              source={imagePaths.rightChevronIcon}
              height={1}
              width={1}
              style={[
                styles.chevronIcon,
                {
                  opacity: modalImageIndex < modalImages.length - 1 ? 1 : 0.5,
                },
              ]}
            />
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const noImageViewDisplay = () => {
    return (
      <View>
        <Image
          source={imagePaths.noImage}
          height={1}
          width={1}
          style={styles.modalImage}
          resizeMode={'contain'}
        />
        <Text style={styles.noImageTextStyle}>
          {strings.no_images_available.toUpperCase()}
        </Text>
      </View>
    );
  };
  const scrollToIndexFailed = error => {
    const offset = error.averageItemLength * error.index;
    listViewRef.current.scrollToOffset({offset});
    setShowLoader(true);
    setTimeout(() => {
      listViewRef.current.scrollToIndex({index: error.index});
      setShowLoader(false);
    }, 10); // You may choose to skip this line if the above typically works well because your average item height is accurate.
  };

  const carousalData = modalImages => {
    return (
      <>
        <FlatList
          data={modalImages}
          keyExtractor={item => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginLeft: modalImages?.length > 1 ? horizontalScale(-32) : 0,
          }}
          scrollEnabled={false}
          ref={listViewRef}
          onScrollToIndexFailed={scrollToIndexFailed}
          renderItem={({item, index}) => {
            return (
              <Image
                source={{uri: modalImages[modalImageIndex]}}
                height={1}
                width={1}
                style={styles.modalImage}
                resizeMode={'contain'}
                // onLoadStart={() => {
                //   setShowLoader(true);
                // }}
                onLoad={() => {
                  setShowLoader(false);
                }}
              />
            );
          }}
        />
      </>
    );
  };

  const paginationView = (modalImages, paginationStyle) => {
    return (
      <>
        {modalImages?.length > 1 && paginationStyle ? (
          <FlatList
            data={modalImages}
            keyExtractor={item => item}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({item, index}) => {
              return (
                <View style={styles.paginationView}>
                  <View
                    style={[
                      styles.paginationDots,
                      {
                        backgroundColor:
                          modalImageIndex === index
                            ? colors.vermillion
                            : colors.purple,
                      },
                    ]}
                  />
                </View>
              );
            }}
          />
        ) : null}
        {modalImages?.length > 1 && !paginationStyle ? (
          <TouchableOpacity
            onPress={() => {
              setGridViewStatus(true);
            }}
            style={[styles.paginationTextBorder, modalBonusBackgroundStyle]}>
            <Text style={[styles.paginationTextStyle, modalTextColorStyle]}>
              <Text style={styles.paginationRichtext1}>
                {modalImageIndex + 1}{' '}
              </Text>
              of
              <Text style={[styles.paginationRichtext2, modalTextColorStyle]}>
                {' '}
                {modalImages?.length}
              </Text>
            </Text>
          </TouchableOpacity>
        ) : null}
      </>
    );
  };

  const renderGridView = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setGridViewStatus(false);
          setModalImageIndex(index);
        }}>
        <Image
          source={{uri: item}}
          height={1}
          width={1}
          resizeMode={'contain'}
          style={[
            styles.gridImageStyle,
            {
              borderColor:
                modalImageIndex === index
                  ? colors.vermillionLighter
                  : colors.purple,
              borderWidth: modalImageIndex === index ? 2 : 1,
              backgroundColor:
                modalImageIndex === index ? colors.vermillionLighter : 'white',
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  const gridViewDisplay = modalImages => {
    return (
      <View style={styles.gridViewDisplay}>
        <FlatList
          data={modalImages}
          ref={listViewRef}
          keyExtractor={item => item}
          numColumns={3}
          renderItem={renderGridView}
          nestedScrollEnabled={true}
        />
      </View>
    );
  };

  const pokemonTypeView = pdata => {
    return (
      <View style={[commonStyling.flexRow]}>
        <Image
          source={{
            uri: pokeTypesData[pdata],
          }}
          height={1}
          width={1}
          style={styles.pokemonTypeImageStyle}
          resizeMode={'contain'}
        />
        <Text
          style={[
            styles.pokemonNameStyle,
            {
              color: darkModeValue ? colors.darkBlue : colors.vermillion,
            },
          ]}>
          {toCamelCase(pdata)}
        </Text>
      </View>
    );
  };

  const pokemonNameAndTypeView = () => {
    let pokeName;
    let pokeShinyType = false;
    const substring1 = 'pokemon_icons';
    const substring2 = '_51.png';
    const substring3 = '_52.png';
    const substring4 = 'fMEGA'; // Mega and Mega X - DONE

    const shinyCategory = [
      '_shiny.png',
      '.s.icon.png',
      'fHISUIAN.s.icon.png',
      '_31_shiny.png',
      '_61_shiny.png',
      'fMEGA.s.icon.png',
      '_51_shiny.png',
      '_52_shiny.png',
    ];

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes(substring1),
    );

    shinyCategory.map(dat => {
      if (modalImages?.[modalImageIndex]?.includes(dat)) {
        pokeShinyType = true;
      }
    });

    if (
      modalImages?.[modalImageIndex]?.includes(substring2) ||
      modalImages?.[modalImageIndex]?.includes(substring4)
    ) {
      if (
        pokemonNameDisplay === 'charizard' ||
        pokemonNameDisplay === 'mewtwo'
      ) {
        pokeName = `Mega ${pokemonNameDisplay} X`;
      } else {
        pokeName = `Mega ${pokemonNameDisplay}`;
      }
    } else if (modalImages?.[modalImageIndex]?.includes(substring3)) {
      pokeName = `Mega ${pokemonNameDisplay} Y`;
    } else {
      pokeName = pokemonNameDisplay;
    }
    return (
      <View style={[styles.pokemonDescription]}>
        {modalImages?.length !== 0 ? (
          <View style={styles.pokemonNameDisplayView}>
            <Text style={[styles.pokemonName, modalTextColorStyle]}>
              {toCamelCase(pokeName)}
            </Text>
            {pokeShinyType ? shinyPokemonIndicatorView() : null}
          </View>
        ) : null}
        <View
          style={[
            commonStyling.flexRow,
            commonStyling.horizontalCenterStyling,
          ]}>
          {pokemonType?.[modalImageIndex]?.map(pdata => {
            return pokemonTypeView(pdata);
          })}
        </View>
      </View>
    );
  };

  const carousalImageSliderSection = modalImages => {
    return (
      <>
        {!gridViewStatus ? (
          <>
            <View style={styles.eventImageContainer}>
              {leftChevronIcon(modalImages)}
              {modalImages.length > 0 ? (
                showLoader ? (
                  <View style={styles.activityIndicatorStyle}>
                    <ActivityIndicator />
                  </View>
                ) : null
              ) : (
                noImageViewDisplay()
              )}
              {carousalData(modalImages)}
              {rightChevronIcon(modalImages)}
            </View>
            {pokemonNameAndTypeView()}
            {paginationView(modalImages, false)}
          </>
        ) : null}

        {gridViewStatus ? (
          <View style={commonStyling.absoluteCenterStyling}>
            {gridViewDisplay(modalImages)}
          </View>
        ) : null}
      </>
    );
  };

  const shinyPokemonIndicatorView = () => {
    return (
      <View style={styles.shinyIndictorView}>
        <Image
          source={imagePaths.shinyIcon}
          height={1}
          width={1}
          style={styles.shinyIcon}
        />
      </View>
    );
  };

  const pokeImageMappingFunction = () => {
    const substring1 = 'pokemon_icons'; // for normal images - DONE
    const substring2 = '_51.png'; // Mega and Mega X - DONE
    const substring3 = '_52.png'; // Mega Y - DONE
    const substring4 = '_shiny.png'; // Shiny - DONE
    const substring5 = '.s.icon.png'; // Shiny - DONE
    const substring6 = 'fHISUIAN.icon.png'; // HISUIAN - DONE
    const substring7 = 'fHISUIAN.s.icon.png'; // HISUIAN Shiny
    const substring8 = '_31.png'; // GALARIAN - DONE
    const substring9 = '_31_shiny.png'; // Shiny Glarian
    const substring10 = '_61.png'; // ALOLAN - DONE
    const substring11 = '_61_shiny.png'; // Shiny Alolan
    const substring12 = 'fMEGA.icon.png'; // Mega and Mega X - DONE
    const substring13 = 'fMEGA.s.icon.png'; //Mega Shiny
    const substring14 = '_51_shiny.png'; //Mega Shiny
    const substring15 = '_52_shiny.png'; //Mega Shiny

    const modalImages = modalData?.['Img Src']?.filter(data =>
      data?.includes(substring1),
    );

    // console.log('MEGA data', modalImages);

    let displayableModalImages = [];

    modalImages?.map((data, idx) => {
      let pushedImage;
      if (data?.includes(substring2) || data?.includes(substring12)) {
        if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
          const pokeString = pokemonName + 'X';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        } else {
          const pokeString = pokemonName;
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        }
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring3)) {
        const pokeString = pokemonName + 'Y';
        const staticInageIdFromDb = pokemon_mega_images[pokeString];
        pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${staticInageIdFromDb}.png`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring14) || data?.includes(substring13)) {
        if (pokemonName === 'charizard' || pokemonName === 'mewtwo') {
          const pokeString = pokemonName + 'X';
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticInageIdFromDb}.png`;
        } else {
          const pokeString = pokemonName;
          const staticInageIdFromDb = pokemon_mega_images[pokeString];
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticInageIdFromDb}.png`;
        }
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring15)) {
        const pokeString = pokemonName + 'Y';
        const staticInageIdFromDb = pokemon_mega_images[pokeString];
        pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${staticInageIdFromDb}.png`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring6)) {
        const idString = modalData?.pokemonId?.[idx] + 'ev';
        pushedImage = pokemon_hisuian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring8)) {
        const idString = modalData?.pokemonId?.[idx] + 'ev';
        pushedImage = pokemon_galarian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring10)) {
        const idString = modalData?.pokemonId?.[idx] + 'ev';
        pushedImage = pokemon_alolan_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring7)) {
        const idString = modalData?.pokemonId?.[idx] + 's';
        pushedImage = pokemon_hisuian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring9)) {
        const idString = modalData?.pokemonId?.[idx] + 's';
        pushedImage = pokemon_galarian_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring11)) {
        const idString = modalData?.pokemonId?.[idx] + 's';
        pushedImage = pokemon_alolan_variants[idString];
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring4)) {
        const ret = data;
        const newStr1 = ret.replace(
          'https://leekduck.com/assets/img/pokemon_icons/pokemon_icon_',
          '',
        );
        const newStr2 = newStr1.replace('_shiny.png', '');
        const newstr3 = newStr2.substr(-3);
        const finalString = newStr2.replace(newstr3, '');

        if (finalString === '201') {
          pushedImage = data;
        } else {
          // eslint-disable-next-line radix
          pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${parseInt(
            finalString,
          )}.png`;
        }
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (data?.includes(substring5)) {
        const ret = data;
        const newStr1 = ret.replace(
          'https://leekduck.com/assets/img/pokemon_icons/',
          '',
        );
        const newStr2 = newStr1.replace('.s.icon.png', '');
        const finalString = newStr2.replace('pm', '');

        // eslint-disable-next-line radix
        pushedImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${parseInt(
          finalString,
        )}.png`;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else if (modalData?.pokemonId[idx] === '201') {
        pushedImage = data;
        displayableModalImages = [...displayableModalImages, pushedImage];
      } else {
        const tempImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${modalData?.pokemonId[idx]}.png`;

        // TODO: TRY TO GET THIS DONE IF POSSIBLE - Try using axios or checkImageExists(url) to get this done

        const ret = data;
        const newStr1 = ret.replace(
          'https://leekduck.com/assets/img/pokemon_icons/',
          '',
        );

        let newStr2;

        if (newStr1.includes('pm')) {
          newStr2 = newStr1.replace('pm', '');
        } else if (newStr1.includes('pokemon_icon_')) {
          newStr2 = newStr1.replace('pokemon_icon_', '');
        }

        let newStr3;

        if (newStr2 === undefined) {
          pushedImage =
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
        } else {
          if (newStr2.includes('.icon.png')) {
            newStr3 = newStr2.replace('.icon.png', '');
          } else if (newStr2.includes('.png')) {
            newStr3 = newStr2.replace('.png', '');
          }

          const finalString = newStr3;
          if (finalString?.length > 6) {
            pushedImage = data;
          } else {
            pushedImage = tempImage;
          }
        }

        /** NOTE:
         * Why length > 6 is used as condition above because when the image string is split, it comes to a number of 3 digits max.
         * Even so some strings may have _00 and _11 attached to it making its length 6 so.
         */

        displayableModalImages = [...displayableModalImages, pushedImage];
      }
    });
    return displayableModalImages;
  };

  const modalContainer = () => {
    let displayableModalImages = pokeImageMappingFunction();

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.modalInnerStyle}>
          <Text style={[styles.modalTextStyle, modalTextColorStyle]}>
            {modalData.Summary}
          </Text>
          <Text style={[styles.eventDescription, modalTextColorStyle]}>
            {modalData?.Description}
          </Text>
          {eventBonusesDisplay()}
          {carousalImageSliderSection(displayableModalImages)}
          {eventTimeDisplay()}
          {modalCloseButton()}
        </View>
      </ScrollView>
    );
  };

  const modalPopUp = () => {
    return (
      <Portal>
        <Modal
          style={styles.modalMarginStyle}
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalExternalStyle,
            {
              backgroundColor: darkModeValue
                ? colors.quaternaryBackgroundColorDarkMode
                : colors.white,
            },
          ]}>
          {modalContainer()}
        </Modal>
      </Portal>
    );
  };

  const setSelectedMonth = () => {
    setEventsData(null);
    setSelectedStartDate(null);
  };

  const calandarView = () => {
    return (
      <View style={styles.calandarView}>
        <CalendarView
          setSelectedStartDate={setSelectedStartDate}
          selectedStartDate={selectedStartDate}
          setSelectedMonth={setSelectedMonth}
          calanderRef={calanderRef}
        />
      </View>
    );
  };

  const eventHeaderSection = () => {
    return (
      <View style={styles.eventsSectionHeader}>
        <Text
          style={[
            styles.eventDateText,
            {
              color: darkModeValue
                ? colors.primaryTextColorDarkMode
                : colors.secondaryColor,
            },
          ]}>
          {eventsData !== null
            ? moment(selectedStartDate).format('MMM Do, YYYY')
            : ''}
        </Text>
        <View style={commonStyling?.flexRow}>
          <Text
            style={[
              styles.eventNumberText,
              {
                color: darkModeValue
                  ? colors.primaryTextColorDarkMode
                  : colors.secondaryColor,
              },
            ]}>
            {strings.number_of_events} :
          </Text>
          <Text style={[styles.eventNumberText, styles.eventNumberText2]}>
            {eventsData?.length ?? 0}
          </Text>
        </View>
      </View>
    );
  };

  const eventsDetailSection = () => {
    return (
      <ScrollView style={styles.eventDataListContainer}>
        {eventsData?.length !== 0 ? (
          <View>
            <FlatList
              data={eventsData}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </View>
        ) : (
          renderEmptyListComponent()
        )}
      </ScrollView>
    );
  };

  // console.log('EVVVVVV', eventsData);

  return (
    <Provider>
      {networkState ? (
        <SafeAreaView
          style={{
            backgroundColor: darkModeValue
              ? colors.secondaryBackgroundColorDarkMode
              : null,
            flex: 1,
          }}>
          {modalPopUp()}
          {calandarView()}
          {eventsData !== null ? eventHeaderSection() : null}
          {eventsData !== null ? eventsDetailSection() : null}
          {eventsData === null ? renderSelectDatePromptComponent() : null}
        </SafeAreaView>
      ) : null}
    </Provider>
  );
};

export default EventViewScreen;
