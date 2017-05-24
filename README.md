# SequenceRunner

Easily create text and animation sequences.

This class was originally conceived to animate loading text, but then extended to support custom content (including DOM elements). It can be used to create unique loading text, HTML sequences, and even sprite animations.

[![sample](https://rawgit.com/Grafluxe/sequence-runner/master/sample.gif)](https://rawgit.com/Grafluxe/sequence-runner/master/sample/index.html)

See the above gif in [its true form](https://rawgit.com/Grafluxe/sequence-runner/master/sample/index.html) (with code samples for each sequence).

## Usage

### Node

`npm i sequence-runner -S`

```
let SequenceRunner = require("sequence-runner");
```

Minified version:

```
let SequenceRunner = require("sequence-runner/dist/SequenceRunner.min");
```

[![npm](https://nodei.co/npm/sequence-runner.png)](https://www.npmjs.com/package/sequence-runner)

### Browser

```
import SequenceRunner from "sequence-runner";
```

Minified version:

```
import SequenceRunner from "sequence-runner/dist/SequenceRunner.min";
```

Script tag:

```
<script src="node_modules/sequence-runner/dist/SequenceRunner.min.js"></script>
```

## Notes

- The source code is written in ES6 and transpiled with Babel.
- If you need to create documentation for local use, run `npm run doc`. Otherwise, visit the online [docs](http://grafluxe.com/doc/js/sequence-runner/SequenceRunner.html).

## Samples

Most simple use case: Animating an ellipsis. The below logic will use all the default settings to create a most basic loading text sequence.

`<span class="sequence-runner"></span>`

```
new SequenceRunner().start();
```

Default settings:

```
console.log(new SequenceRunner().settings);

/*
{
  selector: ".sequence-runner",
  content: ".",
  duplicate: 3,
  delay: 500,
  loop: null
}
*/
```

Animate custom text, duplicate it 10 times, and loop through it twice.

`<span class="sequence-runner"></span>`

```
new SequenceRunner({
  content: "hello.",
  duplicate: 5,
  loop: 2
}).start();
```

Run through a sequence of **different** content.

`<p class="sequence-runner"></p>`

```
new SequenceRunner({
  content: [
    "hi",
    "ho",
    "<b>hum</b>"
  ],
  delay: 500
}).start();
```

Some dummy content with *change* and *complete* listeners.

`<span id="dummy-container"></span>`

```
let seq = new SequenceRunner({
      selector: "#dummy-container",
      content: [
        "foo",
        20
      ],
      loop: 3
    });

seq.onChange((content, count, loop) => {
  console.log(content, count, loop);
});

seq.onComplete((content, count, loop) => {
  console.log("done!");
});

seq.start();
```

Animate a sprite.

`<div id="wrapper"></div>`

```
let keyframes = 7,
    at = 0,
    img = "https://s-media-cache-ak0.pinimg.com/originals/65/17/a7/6517a749c666bb0a788b0452d00e514a.png";

new SequenceRunner({
  selector: "#wrapper",
  duplicate: 1,
  delay: 90,
  content: `<div id="sprite" style="background-image: url(${img}); height: 95px; width: 60px"></div>`
}).start().onChange((content, count, loop) => {
  if (loop % keyframes == 1) {
    at = 0;
  }

  document.querySelector("#sprite").style.backgroundPosition = `-${60 * at}px 0`;
  at++;
});
```

## License

Copyright (c) 2017 Leandro Silva (http://grafluxe.com)

Released under the MIT License.

See LICENSE.md for entire terms.
