import React from 'react';
// import {GiftedChat} from 'react-native-gifted-chat';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Item,
  Input,
} from 'native-base';
import {
  GiftedChat,
  Actions,
  SystemMessage,
  Send,
  InputToolbar,
  Composer,
} from 'react-native-gifted-chat';
import { Actions as ActionsRouter } from 'react-native-router-flux'
import { View, Image, Text, Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');

// import { connect } from 'react-redux';
// import { openChat, sendMessage } from '../store';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.renderSend = this.renderSend.bind(this);
    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    };
  }

  componentDidMount() {
    // openChat({ user: this.props.user, receiver: this.props.receiver });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 10 }}>
          {/* <Image
            source={require('../../Assets/send.png')}
            resizeMode={'center'}
            style={{width: 25, height: 25}}
          /> */}
          <Icon type="Feather" name="plus" />
        </View>
      </Send>
    );
  }
  renderComposer(props) {
    console.log('Props:', props);
    return (
      // <View style={{ flexDirection: 'row-reverse', }}>
      <Composer
        {...props}
      >

        <Icon type="Feather" name="plus" />

      </Composer>
      // </View>
    );
  }
  renderInputTool(props) {
    return (
      <View style={{bottom:0,flex:1,width:width*0.9,marginLeft:25,marginBottom:25}}>   
         <InputToolbar {...props} containerStyle={{ borderTopWidth: 0, borderRadius: 15 }} />
      </View>

    )

  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: 20,
            height: 70,
            flexDirection: 'row',
            backgroundColor: '#ffffff',
          }}>
          <Left>
            <Button transparent>
              <Icon onPress={() => ActionsRouter.pop()} style={{ color: '#454F63' }} name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 25, color: '#454F63' }}>Hazeem</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon style={{ color: '#454F63' }} name="search" />
            </Button>
          </Right>
        </View>
        <GiftedChat

          style={{ backgroundColor: 'transparent' }}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
           renderSend={props => this.renderSend(props)}
          //renderComposer={this.renderComposer}
          textInputProps={{ width: 100 }}
          renderInputToolbar={this.renderInputTool}
        renderFooter={()=>{
          return(
            <View style={{height:25+height*0.03}}/>
          )
        }}


        />

      </View>
    );
  }
}

// const mapState = (state, {navigation}) => ({
//   messages: state.messages,
//   user: state.user,
//   receiver: navigation.getParam('receivingUser')
// });

// export default connect(mapState)(Chat);
