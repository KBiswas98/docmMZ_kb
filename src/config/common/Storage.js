import {AsyncStorage} from 'react-native';

const _saveDataToStorage = async (data, name, callback) => {
  try {
    await AsyncStorage.setItem(name, data, () => callback);
  } catch (err) {
    console.log(err);
  }
};

const _getDataFromLocalStore = async () => {
  var obj = null;
  await AsyncStorage.getItem('userData', (err, result) => {
    if (result !== null) {
      obj = JSON.parse(result);
    }
  });

  return obj;
};

const _removeFromStorage = async name => {
  await AsyncStorage.clear(name, () => {
    return true;
  });
};

const _checkLogin = async() => {
    data = await AsyncStorage.getItem('userData')
    if(data!==null) {
        _data = JSON.parse(data)
        if(_data.email.length > 2){

            return true
        }
        else {

            return false
        }
    }
    else {
        return false
    }
}

export default {_checkLogin, _saveDataToStorage, _getDataFromLocalStore, _removeFromStorage};
