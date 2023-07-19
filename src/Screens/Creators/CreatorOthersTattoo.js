import React, {useState} from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native'
import {scale, verticalScale} from 'react-native-size-matters'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Params = [
  {
    id: '1',
    Pname: 'Arneo Paris',
    Nname: 'Arneo',
    img: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
    Description: 'Gadbu et D autres personnes',
    Dp: require('../../Assets/Images/hello.png'),
    skintone: require('../../Assets/Images/skintone1.png'),
  },
  {
    id: '2',
    Pname: 'Arneo Paris',
    Nname: 'Arneo',
    img: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
    Description: 'Gadbu et D autres personnes',
    Dp: require('../../Assets/Images/hello.png'),
    skintone: require('../../Assets/Images/skintone1.png'),
  },
  {
    id: '3',
    Pname: 'Arneo Paris',
    Nname: 'Arneo',
    img: 'https://menshaircuts.com/wp-content/uploads/2019/01/tattoos-for-men-tribal-chest-sleeve-683x1024.jpg',
    Description: 'Gadbu et D autres personnes',
    Dp: require('../../Assets/Images/hello.png'),
    skintone: require('../../Assets/Images/skintone1.png'),
  },
]

const CreatorOthersTattoo = () => {
  const [isLike, setIsLike] = useState(false)
  const [data, setData] = useState(Params)

  const renderItem = ({item}) => (
    <View style={styles.CardContainer}>
      <View style={styles.NameContainer}>
        <View style={styles.DPCon}>
          <View style={styles.ImgCon}>
            <TouchableOpacity>
              <Image
                style={styles.ImgBox}
                source={item.Dp}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.NameTextCon}>
          <Text style={styles.PersonName}>{item.Pname}</Text>
          <Text style={styles.Nickname}>{item.Nname}</Text>
        </View>
      </View>

      <View style={styles.MainImgCon}>
        <Image
          style={{
            flex: 1,
          }}
          source={{
            uri: item.img,
          }}
          resizeMode={'cover'}
        />
      </View>

      <View style={styles.LikeContainer1}>
        <View style={styles.LikeContainer}>
          <TouchableOpacity onPress={() => setIsLike(true)}>
            <AntDesign
              name={isLike ? 'like1' : 'like2'}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
          <Text style={styles.LikeCount}>56 Likes</Text>
          <TouchableOpacity
            style={{
              paddingLeft: scale(7),
            }}>
            <Ionicons
              name={'chatbubble-ellipses-outline'}
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.LikeContainer3}>
          <Text
            style={{
              fontFamily: 'mulish',
              fontWeight: '900',
              fontSize: 15,
              color: 'black',
            }}>
            Skin Tone:{' '}
          </Text>
          <View
            style={{
              height: scale(13),
              width: scale(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: scale(13), width: scale(15)}}
              source={item.skintone}
            />
          </View>
        </View>
      </View>

      <View style={styles.CreatorCon}>
        <Text style={styles.CreatorText}>Creator</Text>
        <Text style={styles.CreatorName}>{item.Description}</Text>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: scale(20),
    // paddingTop: scale(20),
  },
  CardContainer: {
    height: scale(250),
    backgroundColor: '#05BC03',
    borderRadius: 20,
    marginVertical: verticalScale(10),
  },
  NameContainer: {
    height: scale(38),
    flexDirection: 'row',
    position: 'relative',
    width: '52%',
    left: scale(100),
    marginTop: 4,
  },
  DPCon: {
    height: '100%',
    width: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ImgCon: {
    height: scale(35),
    width: scale(35),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgBox: {
    height: scale(35),
    width: scale(35),
    borderRadius: 100,
  },
  NameTextCon: {
    height: '100%',
    width: '80%',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
  },
  PersonName: {
    fontFamily: 'mulish',
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
  },
  Nickname: {
    fontFamily: 'mulish',
    fontSize: 14,
    color: 'black',
    position: 'relative',
    bottom: scale(3),
  },
  MainImgCon: {
    height: scale(140),
    width: '100%',
    marginVertical: verticalScale(5),
    paddingHorizontal: scale(20),
  },
  LikeContainer1: {
    flexDirection: 'row',
    height: scale(26),
    // width: '100%',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  LikeContainer: {
    flexDirection: 'row',
    height: scale(26),
    width: '60%',
    alignItems: 'center',
    paddingHorizontal: scale(13),
  },
  LikeContainer3: {
    flexDirection: 'row',
    height: scale(26),
    width: '40%',
    alignItems: 'center',
    paddingHorizontal: scale(13),
  },
  LikeCount: {
    fontSize: scale(12),
    fontFamily: 'open sans',
    fontWeight: '700',
    color: 'black',
    paddingLeft: scale(5),
  },
  CreatorCon: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: scale(20),
    marginVertical: 5,
  },
  CreatorText: {
    color: 'black',
    fontFamily: 'open sans',
    fontSize: 15,
    fontWeight: '400',
    paddingRight: scale(5),
  },
  CreatorName: {
    color: 'black',
    fontFamily: 'open sans',
    fontSize: 14,
    fontWeight: '700',
  },
})
export default CreatorOthersTattoo
