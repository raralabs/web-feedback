### Instillation

```sh

#clone project

git clone https://github.com/raralabs/web-feedback.git
cd web-feedback

#install dependencies

yarn

#build lib -> /dist folder

yarn run build-lib

```

### Features

- Capture screenshot of your current viewport window

- Available annotate tools

  - Mark
  - Censor
  - Text Annotate

- Undo Annotates

### Usages

```js
/** Development mode **/
import { Snipping } from '$libDir/lib/dist';

let anything = new Snipping({
  buttonLabel: 'Send Feedback',
  initialMarkMode: 'mark',
  fileName: 'feedbackScreenshot'
  /** other configs **/
});

/*
 * initialize on app start
 * it also return callback with submit data
 */
anything.init((data) => {
  const { image, base64Image } = data;
  /**
   * image : image as file type
   * base64Image: image as base64
   *
   * /
});

/*
 * or you can initialize using calling anything.init() func on any events.
 *eg: onClick:()=> anything.init()
 */

/**
 * All config
 *
 *  button?: boolean; // enables floating button
    buttonLabel?: string; // text for floating button
    initialMarkMode?: IMarkMode; // mark or censored
    buttonPosition?: 'left' | 'bottom'; // position of form
    fileName?: string; // name of file
*/
```

# Contributing

Want to contribute? Please check the guidelines [Contributing.md](https://github.com/raralabs/web-feedback/tree/features/snipping)
