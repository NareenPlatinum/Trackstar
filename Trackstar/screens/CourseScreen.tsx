import React from 'react';
import { Text, View } from 'react-native';
import Styles from '../Styles/CourseStyles';

const CoursesScreen = (props) => {
  const navigation = props.navigation;
    return (
      <View style={Styles.content}>
        <Text>Courses View!</Text>
      </View>
    );
};

export default CoursesScreen;