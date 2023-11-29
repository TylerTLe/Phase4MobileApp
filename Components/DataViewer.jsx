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
export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                console.log('Retrieved data:', value);

                //Attempt to stop data corruption, of false entering
                if(value == null || value == undefined){
                    saveData(key, 0)
                    return 0
                }
                return value;
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
};

export const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

export default dataView = ()=> {var hello = 'hello world'};