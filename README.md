# iframe-widget-boilerplate

Scaffolding for creating iFrame embedded widgets in Stile.

## Installation

### OSX

1. Install Homebrew (follow instructions at [http://brew.sh/](http://brew.sh/))
2. Install Node

    `brew install node`

3. Install Gulp

    `npm install -g gulp`

4. From this folder install dependencies

    ```
    cd path/to/project/folder
    npm install
    ```

## Development Environment

1. Run the dev-server

    `npm run-script dev`

2. Run gulp watch

    `npm run-script gulp`

3. Visit `localhost:8080` in your browser


## Developing (where to put things)

All you work should existing the `/src` directory:

### `src/html/`:

Should contain only the `index.html` file containing minimal boilerplate to get you started.

This file should contain all the projects HTML, all script and style files will be compiled in to it.

### `src/javascript`:

Should contain any `.js` files, they will be compiled into `app.js` along with the stileInterface.js.

`main.js` will be added at the end of `app.js`. So extra libraries can be added as separate files and
used in `main.js`.

**Babeljs has been included in the pipeline, so new ES2015 features can be used.**

*NOTE: Your iFrame will be sandboxed and won't be able to reach any external resources, 3rd party libraries will need to be included in the project. All other communication will need to happen through the Stile iFrame communication interface, documentation is located in the doc/stileInterface.md file.*

### `src/scss`:

Should contain any `.scss` files, they will be compiled into `style.css` along with `reset.scss`.

`reset.scss` will be included first so other CSS files will be included after it.

**SASS has been included in the pipeline, so SASS features can be used.**
**Autoprefixer has been included in the pipeline, so there is no need to include any browser specific prefix to your css rules**

### `src/assets`:

Should contain any other files (images, fonts, etc.). These will be copied and base64 encoded in to the final output. You can reach them in your code at the path `/assets/your-asset-name.ext`.


## Publishing

1. Run `npm run-script publish`

2. This will produce a single `index.html` file in the `output` directory. This is the finished file ready to upload to Stile.