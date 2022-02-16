import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ErrorMessage = ({ error, visible }: any) => {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: '#ef4444',
    fontWeight: '600',
  },
});

export default ErrorMessage;
