import MockApi from './mock/index';
import SheetBestApi from './sheet-best/index';
import PrivateApi from './private/index';

//let apiModule = MockApi;
//let apiModule = PrivateApi;
let  apiModule = SheetBestApi;
if (import.meta.env.PROD) {
    apiModule = SheetBestApi;
}

export default apiModule;