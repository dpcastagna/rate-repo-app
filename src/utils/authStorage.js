import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token from the storage
    const token = await AsyncStorage.getItem(`${this.namespace}:token`);

    return token ? token : '';
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }

  async getSorter() {
    const sorter = await AsyncStorage.getItem(`${this.namespace}:sorter`);

    return sorter ? sorter : 'latest';
  }

  async setSorter(sorter) {
    await AsyncStorage.setItem(`${this.namespace}:sorter`, sorter);
  }
}

export default AuthStorage;