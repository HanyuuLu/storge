/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, View, Image, AppRegistry, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { validate } from '@babel/types';
var MOCKED_MOVIES_DATA = [
    {
        title: "标题",
        year: "2015",
        posters: { thumbnail: "https://hanyuufurude.github.io/Others/positionMesher/1564911063046.png" }
    }
];
var REQUEST_URL =
    "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";
export default class Hanyuu extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            movies: null,
        }
        this.fetchdata = this.fetchdata.bind(this);
    }
    componentDidMount()
    {
        this.fetchdata();
    }
    fetchdata()
    {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) =>
            {
                this.setState(
                    { movies: responseData.movies, }
                    );
            });
    }
    render()
    {
        if (!this.state.movies)
        {
            return this.renderLoadingView();
        }
        var movie = this.state.movies[0];
        return this.renderMovie(movie);

        // var movie = MOCKED_MOVIES_DATA[0];
        // return (
        //     <ScrollView>
        //         <View style={styles.container}>
        //             <Image
        //                 style={styles.thumbnail}
        //                 source={{ uri: movie.posters.thumbnail }}
        //             />
        //             <View style={styles.rightContainer}>

        //                 <Text style={styles.title}>{movie.title}</Text>
        //                 <Text style={styles.year}>{movie.year}</Text>
        //             </View>
        //         </View>
        //     </ScrollView>
        // );
    }
    renderLoadingView()
    {
        return (
            <View style={styles.container}>
                <Text>
                    正在加载电影数据……
        </Text>
            </View>
        );
    }
    renderMovie(movie)
    {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: movie.posters.thumbnail }}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: "center",
    },
    year: {
        textAlign: "center",
    },
    rightContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    icon: {

    },
    cyan: {
        color: 'cyan',
        fontSize: 30,
    },
    blue: {
        color: 'blue',
        fontSize: 30,
    },
    black:
    {
        fontSize: 40,
    },
    hc:
        { fontSize: 25 }
});
