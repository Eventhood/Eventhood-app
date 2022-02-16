import { TouchableHighlight, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { app } from '../utils/firebase';
import { getAuth } from 'firebase/auth';

import SafeAreaView from '../components/SafeAreaView';
import MenuProfileCard from '../components/MenuProfileCard';
import MenuNavigationLink from '../components/MenuNavigationLink';

const auth = getAuth(app);

const ProfileScreen = ({ navigation }: any) => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <MenuProfileCard navigation={navigation} />
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#D1D5DB75"
          onPress={() => navigation.push('Profile')}
        >
          <MenuNavigationLink
            name="View Profile"
            icon={<MaterialIcons name="person" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#D1D5DB75"
          onPress={() => navigation.push('YourEvent')}
        >
          <MenuNavigationLink
            name="Your Event"
            icon={<MaterialCommunityIcons name="calendar-outline" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#D1D5DB75"
          onPress={() => navigation.push('SignUpEvent')}
        >
          <MenuNavigationLink
            name="Sign up Event"
            icon={<MaterialCommunityIcons name="calendar-check" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#D1D5DB75"
          onPress={() => navigation.push('Following')}
        >
          <MenuNavigationLink
            name="Following"
            icon={<MaterialIcons name="person-add" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#D1D5DB75"
          onPress={() => navigation.push('Help-m')}
        >
          <MenuNavigationLink
            name="Help"
            icon={<Ionicons name="help-buoy" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#D1D5DB75"
          onPress={() => navigation.push('Legal')}
        >
          <MenuNavigationLink
            name="Legal"
            icon={<Ionicons name="document-text" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor="#D1D5DB75"
          onPress={() => navigation.push('About')}
        >
          <MenuNavigationLink
            name="About this app"
            icon={<MaterialCommunityIcons name="application" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.5} underlayColor="#D1D5DB75" onPress={handleSignOut}>
          <MenuNavigationLink
            name="Logout"
            icon={<MaterialCommunityIcons name="logout" color="#1E293B" size={30} />}
          />
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
