import * as RootNavigation from '../RootNavigation';
import {stores} from '../store';
import {getStorage} from './storage';
import {Alert} from 'react-native';

const BASEURL = 'http://mm.shopee.com:3000/api/v1';
interface userDataType {
  token: string;
}
// 获取token
async function getToken() {
  let userData = stores.userData;
  // 先从store中获取，若store中没有，则到本地存储中查找
  if (userData.token) {
    return userData;
  } else {
    userData = await getStorage('userdata');
    if (userData.token) {
      stores.setUserData(userData);
      return userData;
    }
  }
  return {token: ''};
}

function fetchTimeout(timeout: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('请求超时'));
    }, timeout);
  });
}

function HandleFetch(url: any, fetchParams: any): Promise<any> {
  const fetchPromise: Promise<any> = new Promise((resolve, reject) => {
    fetch(url, fetchParams)
      .then(response => {
        response
          .json()
          .then(jsonBody => {
            if (response.ok) {
              resolve(jsonBody);
            } else {
              if (jsonBody.error === 'invalid_token') {
                // 跳转登录
                RootNavigation.navigate('Login', {});
              } else {
                // 提示错误
                Alert.alert(jsonBody.error);
              }
            }
          })
          .catch(e => {
            resolve('');
          });
      })
      .catch(e => {
        const error = e;
        reject({
          errno: -1,
          error,
        });
      });
  });
  return Promise.race([fetchPromise, fetchTimeout(5000)]);
}

export const get = async (url: string, params: any = {}): Promise<any> => {
  let paramStr = '?';
  const {token} = await getToken();
  // 如果 token 不存在则跳转登陆页，不浪费请求资源
  if (!token) {
    RootNavigation.navigate('Login', {});
  }

  // get 的 url 参数尾缀拼接
  for (const key in params) {
    paramStr = paramStr + key + '=' + params[key] + '&';
  }
  paramStr = paramStr.substr(0, paramStr.length - 1);

  const fetchParams = {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'X-BLACKCAT-TOKEN': token,
    },
  };
  return HandleFetch(`${BASEURL}${url}${paramStr}`, fetchParams);
};

export const post = async (url: string, params = {}): Promise<any> => {
  const {token} = await getToken();
  const fetchParams = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
      'X-BLACKCAT-TOKEN': token,
    },
  };
  return HandleFetch(`${BASEURL}${url}`, fetchParams);
};

export const del = async (url: string, params = {}): Promise<any> => {
  const {token} = await getToken();
  const fetchParams = {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'X-BLACKCAT-TOKEN': token,
    },
  };
  return HandleFetch(`${BASEURL}${url}`, fetchParams);
};
