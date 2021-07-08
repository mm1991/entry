/**
 * fetch方法封装
 */

import * as RootNavigation from '../RootNavigation';
import {stores} from '../store';
import {getStorage} from './storage';
import {BASEURL} from '../globalConfig';
import ToastTip from '../components/ToastTip';

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
      reject('request timeout');
    }, timeout);
  });
}

function HandleFetch(url: string, fetchParams: any): Promise<any> {
  const fetchPromise: Promise<any> = new Promise((resolve, reject) => {
    fetch(url, fetchParams)
      .then(response => {
        response
          .json()
          .then(jsonBody => {
            if (response.ok) {
              resolve(jsonBody);
            } else {
              reject(jsonBody.error);
            }
          })
          .catch(e => {
            resolve('');
          });
      })
      .catch(e => {
        reject('network error');
      });
  });
  return Promise.race([fetchPromise, fetchTimeout(10000)]).catch(err => {
    if (err === 'invalid_token') {
      // 未登录时跳转登录
      RootNavigation.navigate('Login', {});
    } else {
      // 提示错误
      ToastTip.show(err);
    }
  });
}

export const request = async (
  url: string,
  method: string,
  params: any = {},
  isValidateToken = true
): Promise<any> => {
  const {token} = await getToken();
  if (!token && isValidateToken) {
    RootNavigation.navigate('Login', {});
    return;
  }
  let fetchParams = {
    method,
    mode: 'cors',
    credentials: 'include',
    headers: {
      'X-BLACKCAT-TOKEN': token,
    },
  };
  let paramStr = '';
  if (method === 'GET') {
    paramStr = '?';
    for (const key in params) {
      paramStr = paramStr + key + '=' + params[key] + '&';
    }
    paramStr = paramStr.substr(0, paramStr.length - 1);
  } else if (method === 'POST') {
    fetchParams = Object.assign(fetchParams, {
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'X-BLACKCAT-TOKEN': token,
      },
    });
  }
  return HandleFetch(`${BASEURL}${url}${paramStr}`, fetchParams);
};
