# Usages

### canvas mode

-   Features
    -   Capture screenshot of your curren viewport window
    -   You can mark or censor on that captured screenshot
    -   remove markers

### Instillation

```
/** Dev mode **/
import { snipping } from "$libDir/lib/dist";

let anything = new snipping({
  buttonLabel: "Feedback",
  initialMarkMode: "mark",
});

anything.init(); // initialize on app start

/*
* or you can initialize using calling anything.init() func on any events.
eg: onClick:()=> anything.init()
*/
```
