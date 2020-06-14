import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Card from '../components/Card';


export default class Categories extends React.Component {
  state = {
    data : [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Cup Bread',
      img: require('../assets/cup.png'),
      price: '2.99',
      detail:
        'Wheat free, made with jackfruit & mixed berry smoothie topped with fresh fruit.',
      liked: false,
      quantity:0,
      image:''
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'French Baguette',
      img: require('../assets/FrenchBaguette.png'),
      price: '2.99',
      detail:
        'Wheat free, made with jackfruit & mixed berry smoothie topped with fresh fruit.',
      liked: false,
      quantity:0,
      image:''
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      img: require('../assets/maskCopy.png'),
      price: '2.99',
      detail:
        'Wheat free, made with jackfruit & mixed berry smoothie topped with fresh fruit.',
      liked: false,
      quantity:0,
      image:''
    },
    {
      id: '1',
      title: '4 Item',
      img: require('../assets/maskCopy.png'),
      price: '2.99',
      detail:
        'Wheat free, made with jackfruit & mixed berry smoothie topped with fresh fruit.',
      liked: false,
      quantity:0,
      image:''
    },
    {
      id: '2',
      title: '5 Item',
      img: require('../assets/maskCopy.png'),
      price: '2.99',
      detail:
        'Wheat free, made with jackfruit & mixed berry smoothie topped with fresh fruit.',
      liked: false,
      quantity:0,
      image:''
    },
    {
      id: '3',
      title: '6 Item',
      img: require('../assets/maskCopy.png'),
      price: '2.99',
      detail:
        'Wheat free, made with jackfruit & mixed berry smoothie topped with fresh fruit.',
      liked: false,
      quantity:0,
      image:''
    },
  ],
  modalVisible:false,
  modalData:null,
  roundchecked:true,
  squarechecked:false,
  selectedImage:null,
  addPicture:false,
  imageUri:''
};

  totalItemInCart=(arr)=>{
    let totalCount = 0;
    for(let item of arr){
      totalCount = totalCount + parseInt(item.quantity,10);
    }
    return totalCount;
  }

  totalAmount = (arr) => {
    let totalAmount = 0;

    for(let item of arr){
      totalAmount = totalAmount + (parseFloat(item.price)*item.quantity);
    }
    return totalAmount;
  }

  increment = (id) => {
    this.setState(prevState => {
      let {data} = prevState;
      data = data.map(item => {
        if(item.id === id){
          return {
            ...item,
            quantity:item.quantity+1
          };
        }
        return item;
      });

      return {
        ...prevState,
        data
      }
    });
  };

  decrement = (id) => {
    this.setState(prevState => {
      let {data} = prevState;
      data = data.map(item => {
        if(item.id === id && item.quantity > 0){
          return {
            ...item,
            quantity:item.quantity-1
          }
        }
        return item;
      });

      return {
        ...prevState,
        data
      }
    });
  };

  likeDislike = (id) => {
    this.setState(prevState => {
      let {data} = prevState;
      data = data.map(item => {
        if(item.id === id){
          return {
            ...item,
            liked: !(item.liked)
          }
        }
        return {...item};
      });

      return {
        ...prevState,
        data
      };
    });
  };

  setImage = (id,image) => {
    this.setState(prevState => {
      let {data} = prevState;
      data = data.map(item => {
        if(item.id === id){
          return {
            ...item,
            image
          }
        }
        return {...item};
      });

      return {
        ...prevState,
        data
      };
    });
  };

  selectImage=(id)=>{
    ImagePicker.openPicker({
      width: 50,
      height: 50,
      cropping: true
    }).then(image => {
      console.log(image);
      this.setImage(id,image.path);
    });
  }

  render() {
    console.log('this.state',this.state);
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#EF7922" />

        <View
          style={{
            flex: 2,
            backgroundColor: '#EF7922',
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
          }}>
          <View style={{flex: 1, flexDirection: 'row', left: '10%', top: '2%'}}>
            <View style={{flex: 1}}>
              <Image source={require('../assets/menu.png')} />
            </View>
            <View style={{flex: 5}}>
              <Text style={{color: 'white', fontSize: 20}}>Categories</Text>
            </View>
            <View style={{flex: 1}}>
              <Image source={require('../assets/search.png')} />
            </View>
            <View style={{flex: 1}}>
              <Image source={require('../assets/cart.png')} />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity>
              <Text style={styles.headtxt}>Bread</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.headtxt}>Rolls</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.headtxt}>Small Pastry</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.headtxt}>Coffee</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.headtxt}>Cookies</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={{flex: 8}}>
        <ScrollView contentContainerStyle={{
          flexDirection:"row",
          flexWrap:"wrap",
          padding:10,
          justifyContent:"space-around"
          }} showsVerticalScrollIndicator={false}>
            {
              this.state.data.map(item => {
                return (
                  <TouchableOpacity key={item.id.toString()} onPress={()=>this.setState({modalData:item,modalVisible:!this.state.modalVisible})} style={{marginLeft:10}}>
                    <Card inc={(id) => this.increment(id)} likeDislike={(id)=>this.likeDislike(id)} dec={(id)=>this.decrement(id)} like={(id)=>this.like(id)} {...item}/>
                  </TouchableOpacity>
                )                
              })
            }
            </ScrollView>
        </View>


        <View style={{flex: 2}}>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#EF7922',
              margin: '5%',
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <View style={{flex: 1, borderColor: 'red', left: '20%'}}>
              <Text style={{color: 'white', fontSize: 18}}>{this.totalItemInCart(this.state.data).toString()}</Text>
              <Text style={{color: 'white', fontSize: 18}}>${this.totalAmount(this.state.data)}</Text>
            </View>
            <View style={{flex: 0.2, left: '35%'}}>
              <Text style={{color: 'white', fontSize: 18}}>Cart</Text>
            </View>
            <View style={{flex: 0.2, left: '20%'}}>
              <Image source={require('../assets/moveon.png')} />
            </View>
          </TouchableOpacity>
        </View>

        {this.state.modalData !== null && <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={{backgroundColor:'white',height:'70%',marginTop:'40%',borderTopLeftRadius:12,borderTopRightRadius:12,elevation:5,padding:10}}>
          <Text>{this.state.modalData.title}</Text>

          <View>
            <Text>Select Shape</Text>
            <View style={{flexDirection:"row"}}>
              <CheckBox
                center
                title='Round'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.roundchecked}
              />
              <CheckBox
                center
                title='Square'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.squarechecked}
              />
            </View>
          </View>


          <View>
            <Text>Extra Creme</Text>
            <CheckBox
              title='Yes'
              checked={this.state.checked}
            />
          </View>

          <View>
            <Text>Add Picture</Text>
            <CheckBox
              title='Yes'
              onPress={()=>this.setState({addPicture:!this.state.addPicture})}
              checked={this.state.addPicture}
            />
          </View>

          {
            this.state.addPicture ? (
              <View style={{flexDirection:"row"}}>
                {this.state.modalData.image !== '' ? <Image style={{width:50,height:50,borderRadius:8}} resizeMode='contain' source={{uri:this.state.modalData.image}}/> : null}
                <TouchableOpacity style={{marginLeft:10}} onPress={()=>this.selectImage(this.state.modalData.id)}>
                  <Text>Upload Other Picture</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }

          <TouchableOpacity onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  flexDirection:'row'
  },
  item: {
    marginTop: '5%',
    // marginLeft: '6%',
  },
  title: {
    fontSize: 18,
  },
  headtxt: {
    color: 'white',
  },
});
