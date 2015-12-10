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

1. Start the dev-server (leave it running)

    `npm run-script dev`

2. Start gulp watch (leave it running)

    `npm run-script gulp`

3. Visit `localhost:8080` in your browser


## Developing (where to put things)

All your work should exist in the `/src` directory:

### `src/html/`:

In template contains only the `index.html` file with minimal boilerplate to get you started.

Put your project's HTML in this. The build process will compile all script and style files into `style.css` and `app.js` files, as referred to in `index.html`.

### `src/javascript`:

Put your `.js` files in here. Your code and the provided `stileInterface.js` will all be compiled together as the single output JavaScript file `app.js`.

`main.js` will be added at the end of `app.js` such that its contents will run as soon as `app.js` loads in `index.html`. So you can add extra libraries as separate files and refer to them in `main.js`.

**Babeljs has been included in the pipeline, so new ES2015 features can be used.**

*NOTE: Your iFrame will be sandboxed and won't be able to reach any external resources; you will need to include copies of any third-party libraries you want to use inside your project.

All other communication will need to happen through the Stile iFrame communication interface. Documentation for this is located in the doc/stileInterface.md file.*

### `src/scss`:

Put your `.scss` files here. Your styles and the provided `reset.scss` will all be compiled together as the single output CSS file `style.css`.

`reset.scss` will be included first so other CSS files will be included after it.

**SASS has been included in the pipeline, so SASS features can be used.**
**Autoprefixer has been included in the pipeline, so there is no need to include any browser specific prefix to your css rules**

### `src/assets`:

Put your other files (images, fonts, etc.) here. These will be copied and Base64-encoded into the final output. You can reach them in your code at the path `/assets/your-asset-name.ext`.


## Publishing

1. Run `npm run-script publish`

2. This will produce a single `index.html` file in the `output` directory. This is the finished file ready to upload to Stile.
