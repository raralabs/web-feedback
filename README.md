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

-   Features
    -   Capture screenshot of your current viewport window
    -   You can mark or censor on that captured screenshot
    -   remove markers

### Usages

```js
/** Development mode **/
import { snipping } from '$libDir/lib/dist';

let anything = new snipping({
    buttonLabel: 'Feedback',
    initialMarkMode: 'mark'
});

anything.init(); // initialize on app start

/*
 * or you can initialize using calling anything.init() func on any events.
 *eg: onClick:()=> anything.init()
 */
```
