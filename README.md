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

### Features

- Capture screenshot of your current viewport window

- Available annotate tools

  - Mark
  - Censor
  - Text Annotate

- Undo/Redo Annotates

### Usages

```js
/** Development mode **/
import { Snipping } from '$libDir/lib/dist';

let anything = new Snipping({
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
