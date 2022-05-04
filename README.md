<h1 align="center"> Web Feedback 
<div>
<img src="https://img.shields.io/badge/License-MIT-red.svg"/>
<img src="https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff"/>
<img src="https://img.shields.io/badge/--F7DF1E?logo=javascript&logoColor=000"/>
<img src="https://img.shields.io/npm/v/@raralabs/web-feedback"/>
<img src="https://img.shields.io/badge/Contribution%20is%20welcome-%E2%9D%A4%EF%B8%8F-green.svg"/>
</div>
</h1>

Helps in better and quicker user feedback for native web components, with ability to capture a screenshot with a single click and submitting feedback component for javascript projects.

<div align="center">
<img src="https://i.imgur.com/sCiRyBn.gif" />
</div>

### Instillation

```sh
npm i @raralabs/web-feedback
```

### Usages

```js
import { Snipping } from '@raralabs/web-feedback';
import '@raralabs/web-feedback/dist/css/style.css'; // stylesheet

let snap = new Snipping({
  buttonLabel: 'Send Feedback',
  initialMarkMode: 'mark',
  fileName: 'feedbackScreenshot.png'
  /** other configs **/
});

/*
 * initialize on app start
 * it also return callback with screenshot data as
 * image : image as file type
 * base64Image: image as base64
 */
snap.init((data) => {
  const { image, base64Image } = data;
});
```

### Configs

Common config you may want to specify include:

- `button` : boolean - enable or disable floating snapper button
- `buttonLabel`: string - text label for floating snapper button
- `initialMarkMode`: enum[ 'mark' | 'censored' | 'text' ] - Initial mark mode for the snipper
- `buttonPostion`: enum[ 'left' | 'right' ] - Position of floating snapper button
- `fileName`: string - file name for the screenshot

# Contributing

Want to contribute? Please check the guidelines [Contributing.md](https://github.com/raralabs/web-feedback/blob/main/CONTRIBUTING.md). All PRs and issues are welcome.
