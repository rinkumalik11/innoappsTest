import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

let likeIcon = require('../assets/likeIcon.png');
let unlikeIcon = require('../assets/unlikeIcon.png');


export default Card = (props) => {
  const {img, title, price, quantity, inc, id, dec, liked, likeDislike} = props;
  return (
    <View style={styles.item} key={id}>
    <TouchableOpacity style={{width:25,height:25,borderRadius:5,position:'absolute',zIndex:1,right:10,top:10}} onPress={()=>likeDislike(id)}>
      {liked ? <Image style={{width:25,height:25,borderRadius:5,}} source={likeIcon}/> : <Image style={{width:25,height:25,borderRadius:5,}} source={unlikeIcon}/>}
    </TouchableOpacity>
      <Image source={img} />
      <Text style={styles.title}>{title}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{price}</Text>
        <View
          style={{
            flexDirection: 'row',
            borderColor: '#D7D7D7',
            borderWidth: 1,
            elevation: 1,
          }}>
          {quantity > 0 ? (<TouchableOpacity onPress={()=>dec(id)}>
            <Text>-</Text>
          </TouchableOpacity>) : null}
          <TouchableOpacity>
            <Text>{quantity === 0 ? 'BESTEL' : quantity}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>inc(id)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginTop: '5%',
  },
});
