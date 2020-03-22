/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainNavigation from './src/config/routes/MainNavigation'

AppRegistry.registerComponent(appName, () => MainNavigation);
