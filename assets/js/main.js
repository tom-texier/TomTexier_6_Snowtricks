const $ = require('jquery');
global.$ = global.jQuery = $;

import * as Component from "./components/components";
import * as Ajax from './ajax/ajax';

export default function initJS()
{
    $(document).ready(function() {
        Component.init();
        Ajax.init();
    })
}