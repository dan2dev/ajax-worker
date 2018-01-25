# ajax-worker

## How to Install

```bash
$ npm install ajax-worker --save
```

### How to Use ###

```javascript

import AjaxWorker from "ajax-worker";

AjaxWorker.fetch({
    url: "/somerequest.json",
    onSuccess: (response) => {
        // put your code here
    },
    onAbort: (request) => {
        // put your abort code here
    }
});

```