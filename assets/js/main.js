import * as Media from "./components/_media";
import * as CustomCollectionType from "./components/form/_custom-collection-type";

export default function initJS()
{
    window.onload = (event) => {
        Media.init();
        CustomCollectionType.init();
    }
}