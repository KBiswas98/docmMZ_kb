/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainNavigation from './src/config/routes/MainNavigation'
// import Schedule from './src/screens/Schedule/Schedule'
import Store from './src/redux/config/store'

AppRegistry.registerComponent(appName, () => Store);
 