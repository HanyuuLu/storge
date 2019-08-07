/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, {Fragment} from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import React, { Component } from 'react';
import { Text, View, Image,AppRegistry,StyleSheet,TextInput  } from 'react-native';
import { validate } from '@babel/types';
// import { booleanLiteral } from '@babel/types';

class TextBox extends Component
{
  render()
  {
    return (
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Text style={styles.black}>Msg:{this.props.text}</Text>
      </View>
    )
  }
}
class Blink extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { isShowingText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() =>
    {
      this.setState(previousState =>
      {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }

  render()
  {
    // 根据当前showText的值决定是否显示text内容
    if (!this.state.isShowingText)
    {
      return null;
    }

    return (
      <Text style={styles.hc}>{this.props.text}</Text>
    );
  }
}

class BlinkApp extends Component
{
  render()
  {
    return (
      <View style={{flex:1, backgroundColor:'skyblue',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
        <Blink text='I love to blink' />
        {/* <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' /> */}
      </View>
    );
  }
}
export default class Hanyuu extends Component
// class Hanyuu extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { text: 'Placeholder' };
  }
  render()
  {
    let pic = {
      // url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      url: 'https://cn.bing.com/th?id=OIP.-UsS9De1IkPRXpi0EJ4lsQHaFj&pid=Api&rs=1.jpg'
    };
    return (
      <View style={{ flex: 1,  alignItems: "center" ,backgroundColor:"powderblue"}}>
        <Text style={styles.blue}>Hanyuu desu</Text>
        <Image source={pic} style={{ width: 200, height: 200 }} />
        <Text>line</Text>
        <TextBox text="Hanyuu" />
        <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={(text) => this.setState({ text })} value={this.state.text} />
        <Text style={styles.black}>{this.state.text}</Text>
        <BlinkApp/>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  cyan: {
    color: 'cyan',
    fontSize: 30,
  },
  blue: {
    color: 'blue',
    fontSize:30,
  },
  black:
  {
    fontSize: 40,
  },
  hc:
  {fontSize:25}
});

// const App = () => {
//   return (
    // <Fragment>
    //   <StatusBar pedding="20px" barStyle="dark-content" />
    //   <SafeAreaView>
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       style={styles.scrollView}>
    //       <Header />
    //       {global.HermesInternal == null ? null : (
    //         <View style={styles.engine}>
    //           <Text style={styles.footer}>Engine: Hermes</Text>
    //         </View>
    //       )}
    //       <Text style = {styles.sectionTitle}>Hanyuu desu</Text>
    //       <View style={styles.body}>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>Step One</Text>
    //           <Text style={styles.sectionDescription}>
    //             Edit <Text style={styles.highlight}>App.js</Text> to change this
    //             screen and then come back to see your edits.
    //           </Text>
    //         </View>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>See Your Changes</Text>
    //           <Text style={styles.sectionDescription}>
    //             <ReloadInstructions />
    //           </Text>
    //         </View>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>Debug</Text>
    //           <Text style={styles.sectionDescription}>
    //             <DebugInstructions />
    //           </Text>
    //         </View>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>Learn More</Text>
    //           <Text style={styles.sectionDescription}>
    //             Read the docs to discover what to do next:
    //           </Text>
    //         </View>
    //         <LearnMoreLinks />
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </Fragment>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;
