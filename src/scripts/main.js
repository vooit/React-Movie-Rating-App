import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';

import NavHeader from './NaviComponent';
import './Helpers/imagesloaded.pkgd.min.js';
import '../styles/styles.scss';

render(
    <Provider>
        <NavHeader />
    </Provider>, document.getElementById('app'));