import AsyncStorage from "@react-native-community/async-storage"

export const keys = {
    uuid: 'uuid',
}

const setAsyncStorage = async(key,item)=> {
    try{
        await AsyncStorage.setItem(key,item)
    }catch (error) {
        console.log(error)
    }
}

const getAsyncStorage = async (key) => {
  try {
    const value =  AsyncStorage.getItem(key);
    if(value){
        return value;
    }else{
        return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const clearAsynStorage = async() => {
  try {
    await AsyncStorage.clear();
  }catch (error) {
    console.log(error);
  }
}

export let uuid = "";
// export let keyboardVerticalOffset = -50;
export const smallDeviceHeight = 650;

export const setUniqueValue = (u) => {
  uuid = u;
};




export {setAsyncStorage, getAsyncStorage, clearAsynStorage}