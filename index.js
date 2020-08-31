/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './modules/login_with_otp/index';

AppRegistry.registerComponent(appName, () => App);
