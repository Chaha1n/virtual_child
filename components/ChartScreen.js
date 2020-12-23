import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import styles from '../assets/style/styles.js';

import AddSleepTimeModal from "./parts/AddSleepTimeModal";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'


class ChartScreen extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>起床就寝管理</Text>
        <LineChart
            data={{
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                datasets: [{
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                }]
            }}
            width={300} // from react-native
            height={220}
            yAxisLabel={'円'}
            chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 0.5) => `rgba(0, 0, 0,0.5)`,
            }}
                // bezier
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <AddSleepTimeModal/>
      </View>
    );
  }
}

export default ChartScreen;