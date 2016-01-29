# mongoose-plugin-timestamp
[![Build Status](https://circleci.com/gh/MrBoolean/mongoose-plugin-timestamp.svg?style=shield&circle-token=adcd04014305c8bcb9a2e220fd9e5a3b5ccd0f84)](https://circleci.com/gh/MrBoolean/mmongoose-plugin-timestamp/tree/master) [![Codacy Badge](https://api.codacy.com/project/badge/grade/86af92bf8dd74e3698ab0c79496cf364)](https://www.codacy.com/app/mrboolean/mongoose-plugin-timestamp)


# Install
```
npm i --save mongoose-plugin-timestamp
```

# Usage
```javascript
var mongoose = require('mongoose');
var timestampPlugin = require('mongoose-plugin-timestamp');

var NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true }
});

NewsSchema.plugin(timestampPlugin, {
  // ...
});

// ...
```

# Options
```javascript
{
  declaration: {
    created: {
      key: 'created',
      config: {
        type: Date
      }
    },
    updated: {
      key: 'updated',
      config: {
        type: Date
      }
    }
  }
}
```

## License
The MIT License (MIT)

Copyright (c) 2016 Marc Binder <marcandrebinder@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
