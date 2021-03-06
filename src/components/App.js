
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import DealList from './DealList';
import DealDetail from './DealDetail';

import ajax from './../ajax';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

class App extends Component {

    state = {
        deals: [],
        currentDealId: null,
    }

    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals();
        this.setState((prevState) => {
            return { deals: deals };
        });
    };

    setCurrentDeal = (dealId) => {
        this.setState({
            currentDealId: dealId,
        });
    };

    currentDeal = () => {
        return this.state.deals.find(
            (deal) => deal.key === this.state.currentDealId
        );
    };

    render() {
        if (this.state.currentDealId) {
            return (
                <View style={styles.container}>
                    <DealDetail
                        deal={this.currentDeal()} />
                </View >
            )
        }

        if (this.state.deals.length > 0) {
            return (
                <View style={styles.container}>
                    <DealList
                        deals={this.state.deals}
                        onItemPress={this.setCurrentDeal} />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Text style={styles.containerText}>Bakesale!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    containerText: {
        fontSize: 30,
    }
});

export default App;