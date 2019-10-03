/**
 *
 * Asynchronously loads the component for SearchPage
 *
 */

import loadable from "utils/loadable";

export default loadable(() => {
    return import("./index");
});
