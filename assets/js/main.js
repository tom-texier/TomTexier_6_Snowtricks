const $ = require('jquery');
global.$ = global.jQuery = $;

import * as Components from "./components/components";
import * as Ajax from './ajax/ajax';
import * as Pages from './pages/pages';

export default function initJS()
{
    $(document).ready(function() {
        Components.init();
        Ajax.init();
        Pages.init();
    })
}