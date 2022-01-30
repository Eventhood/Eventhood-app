import { StyleSheet, Platform, StatusBar, SafeAreaView, ViewProps } from 'react-native';

export default (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<SafeAreaView> &
    Readonly<ViewProps> &
    Readonly<{ children?: React.ReactNode }>
) => (
  <SafeAreaView style={styles.AndroidSafeArea} {...props}>
    {props.children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
