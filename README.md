# ng.cx.popover

Popover component for angular applications.

> ###DESCRIPTION###

ng.cx.popover provides 2 directives:

`cx-popover-trigger`
Component in charge of triggering show and hide events for the popover.

```html
    <div cx-popover-trigger
         cx-popover-trigger-io-popover-id="myPopover (@)"
         cx-popover-trigger-io-placement="top || right || left || bottom (@)"
         cx-popover-trigger-io-event="mouseenter || click (@)"
         cx-popover-trigger-io-enabled="true || false (=) "
         >
    </div>
```

`cx-popover`
The actual popover

```html
    <div cx-popover
         cx-popover-io-popover-id="myPopover (@)"
         >
    </div>
```

## Getting Started

Add **ng.cx.popover** to you project.

Via bower:

```
$ bower install --save ng.cx.popover
```

Checkout the [full documentation](https://github.com/ef-ctx/ng.cx.popover).

## Contributing

We'd love for you to contribute to our source code and to make it even better than it is today!

Make sure you read the [Contributing Guide](CONTRIBUTING.md) first.


## Developing

Clone this repository, install the dependencies and simply run `grunt`.

```
$ npm install -g grunt-cli bower
$ npm install
$ bower install
$ grunt
```

## [MIT License](LICENSE)

[Copyright (c) 2015 EF CTX](https://raw.githubusercontent.com/EFEducationFirstMobile/oss/master/LICENSE)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
