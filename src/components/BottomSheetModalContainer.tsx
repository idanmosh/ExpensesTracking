import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import colors from '../constants/colors';
import { ms } from 'react-native-size-matters';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

interface BottomSheetModalContainerProps {
  children?: ReactNode;
  title?: string;
  onPressClose: () => void;
  style?: StyleProp<ViewStyle>;
  LeftComponent?: ReactNode;
}

const BottomSheetModalContainer: FC<BottomSheetModalContainerProps> = ({
  title,
  children,
  onPressClose,
  LeftComponent,
  style
}) => (
  <View style={styles.container}>
    <View style={[style, styles.content]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onPressClose}>
          <EvilIcons name="close" size={ms(24)} color={colors.black} />
        </TouchableOpacity>
        {!!title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.leftComponentContainer}>{LeftComponent}</View>
      </View>
      <View style={styles.bodyContainer}>{children}</View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Helvetica',
    fontSize: ms(18),
    lineHeight: ms(24),
    letterSpacing: -0.2,
    textAlign: 'center',
    fontWeight: '400',
    paddingTop: ms(40)
  },
  leftComponentContainer: {
    position: 'absolute',
    left: 20,
    top: 10,
    zIndex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  headerContainer: {
    marginBottom: ms(26)
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: 1,
    paddingTop: ms(10)
  },
  content: {
    overflow: 'hidden',
    backgroundColor: colors.white
  },
  bodyContainer: {
    overflow: 'hidden',
    marginBottom: ms(24)
  }
});

export default BottomSheetModalContainer;
