import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Box, HStack, Button, Modal, Center } from 'native-base';
import RegisteredEventCard from '../components/RegisteredEventCard';
import { useEffect, useState } from 'react';
import { URL } from '@env';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import * as Location from 'expo-location';

import { app } from '../utils/firebase';

const auth = getAuth(app);

const SignUpEventScreen = ({ navigation }: any) => {
  const [registeredEventList, setRegisteredEventList] = useState([]);
  const isFocused = useIsFocused();
  const [location, setLocation] = useState<any>();
  const [userUUID, setUserUUID] = useState('');
  const [showModal, setShowModal] = useState(false);

  const unregisterEventHandler = async (registeredId: any) => {
    try {
      await fetch(`${URL}/api/eventregistrations/${registeredId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
        },
      });

      const resEventRegister = await fetch(`${URL}/api/eventregistrations/user/${userUUID}`);
      const jsonResEventRegister = await resEventRegister.json();

      if ('data' in jsonResEventRegister) {
        setRegisteredEventList(jsonResEventRegister.data);
      } else {
        setRegisteredEventList([]);
      }

      setShowModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resUser = await fetch(`${URL}/api/users/${auth.currentUser?.uid}`, {
          headers: {
            Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
          },
        });
        const jsonResUser = await resUser.json();
        setUserUUID(jsonResUser.data._id);

        const resEventRegister = await fetch(
          `${URL}/api/eventregistrations/user/${jsonResUser.data._id}`
        );
        const jsonResEventRegister = await resEventRegister.json();

        if ('data' in jsonResEventRegister) {
          setRegisteredEventList(jsonResEventRegister.data);
        }
      } catch (error) {
        console.error('Error fetching');
      }
    })();
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      let locationInfo = await Location.requestForegroundPermissionsAsync();

      while (locationInfo.status !== 'granted') {
        locationInfo = await Location.requestForegroundPermissionsAsync();
      }

      let locations = await Location.getCurrentPositionAsync({});
      setLocation(locations);
    })();
  }, [isFocused]);

  return (
    <ScrollView>
      {registeredEventList.length === 0 ? (
        <Center>
          <Text fontSize="xl" fontWeight="semibold" padding={4}>
            No upcoming event
          </Text>
        </Center>
      ) : (
        <Text fontSize="xl" fontWeight="semibold" padding={4}>
          Your upcoming event
        </Text>
      )}

      {registeredEventList.length !== 0
        ? registeredEventList.map((event: any, key) => {
            return (
              <Box padding={6}>
                <RegisteredEventCard
                  navigation={navigation}
                  location={location}
                  eventInfo={event}
                  key={key}
                />
                <HStack>
                  <Button
                    style={styles.buttonUnregister}
                    _text={{
                      fontWeight: 'semibold',
                    }}
                    onPress={async () => {
                      await unregisterEventHandler(event._id);
                    }}
                  >
                    Unregister
                  </Button>
                </HStack>
              </Box>
            );
          })
        : null}

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <Modal.Content style={styles.modal}>
          <Modal.Body>
            <Center>
              <Text fontSize="md" fontWeight="normal" m={4}>
                Event Unregistered!
              </Text>
            </Center>
            <Button
              style={styles.button}
              onPress={() => {
                setShowModal(false);
              }}
            >
              OK
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonUnregister: {
    backgroundColor: '#EF4444',
    flex: 1,
    height: 40,
    borderRadius: 0,
  },
  modal: {
    padding: 10,
  },
  button: {
    backgroundColor: '#3B82F6',
    flex: 1,
    height: 50,
    marginTop: 20,
  },
});
export default SignUpEventScreen;
