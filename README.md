# delay-promise-func

Function that returns promise that wait specified milliseconds and then call specified function.

[![Coverage Status](https://coveralls.io/repos/github/artemdudkin/delay-promise-func/badge.svg)](https://coveralls.io/github/artemdudkin/delay-promise-func) [![Build Status](https://api.travis-ci.org/artemdudkin/delay-promise-func.svg?branch=master)](https://api.travis-ci.org/artemdudkin/delay-promise-func.svg?branch=master)

## Example

```js
const delayed = require('delay-promise-func');

const p = (url) => require('axios').get(url);

const delayed_p = delayed(p, 500);

delayed_p(url).then(res => {
    //will call axios's get() after 500ms of waiting
})
```
