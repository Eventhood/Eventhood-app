import { StyleSheet, ViewProps, View } from 'react-native';

export default (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<View> &
    Readonly<ViewProps> &
    Readonly<{ children?: React.ReactNode }>
) => (
  <View style={styles.safeArea} {...props}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 30,
  },
});
