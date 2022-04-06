### Instillation

```sh
#clone project
git clone https://github.com/raralabs/feedback.git

cd feedback

#install dependencies
yarn
#build lib -> /dist folder
yarn run build-lib
```

### canvas mode

- Features
  - Capture screenshot of your current viewport window
  - You can mark or censor on that captured screenshot
  - Annotate with text

### Usages

```js
/** Development mode **/
import { snipping } from '$libDir/lib/dist';

let anything = new snipping({
  buttonLabel: 'Feedback',
  initialMarkMode: 'mark'
});

/*
 * initialize on app start
 * it also return callback with submit data
 */
anything.init((data) => {});

/*
 * or you can initialize using calling anything.init() func on any events.
 *eg: onClick:()=> anything.init()
 */
```
