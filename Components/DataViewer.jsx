import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
export const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

// Retrieve data
export const retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                console.log('Retrieved data:', value);
                return value;
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
};

export default dataView = ()=> {var hello = 'hello world'};