# Devveil 🧐🛠️

Devveil is an npm package for developers that aims to make it easier to search and debug components. When Devveil is activated and you hover over a component, a pop-up appears displaying the component's name and a link that redirects directly to the component in Visual Studio Code. It supports Vue, React, Svelte, basic HTML, and Angular.

<p align="center">
  <img src="https://github.com/Nemetar/devveil/assets/53270472/a39c0fd3-0926-4b13-a439-577d9e0a6dfa" alt="devveil" width="100%">
</p>

## Installation 🔧

To install Devveil, run the following command:
```
npm install -g devveil
```
## Usage 💻

Devveil has two main commands:

* `devveil --inject`: Adds the necessary tags to the elements in your project.
* `devveil --remove`: Removes the added elements before committing.

To use Devveil, simply run one of the commands above in your project directory. Devveil currently takes into account elements in the `src/components`, `src/pages`, and `src/views` directories.

## How it Works 🤔

Devveil injects tags into your project's elements, allowing it to recognize and display information about your components when you hover over them. The injected tags are temporary and can be easily removed with the `--remove` command before committing your changes.

## Supported Frameworks 🌐

Devveil currently supports the following frameworks:

* Vue
* React
* Svelte
* Basic HTML
* Angular

## Limitations and Improvements ⚠️🔧

Please note that Devveil is still in the testing phase and may have some limitations. Some features may not work as expected, and some frameworks may not be fully supported. However, improvements are constantly being made, and any help is welcome!

## Contributing 💪

If you would like to contribute to Devveil, please open a pull request with your proposed changes. All contributions are welcome!

## License 📄

Devveil is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## GitHub Repository 🔗

You can find the Devveil repository on GitHub at the following link: [Devveil GitHub](https://github.com/Nemetar/devveil)

---
