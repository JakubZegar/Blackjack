# Blackjack game made in React

### Required dependencies:
testing-library/jest-dom: ^5.11.4,
testing-library/react: ^11.1.0,
testing-library/user-event": ^12.1.10,
react: ^17.0.1,
react-dom: ^17.0.1,
react-router-dom: ^5.2.0,
react-scripts": 4.0.2,
styled-components: ^5.2.1,
web-vitals: ^1.0.1

### ...or you can just run nmp install

![Game](https://i.imgur.com/klf6TeK.png)

## How to play?
To start playing, click on play button. Game lasts 5 rounds.
![mainmenu](https://i.imgur.com/lsMMrtH.png)

Then choose how much you want to bet using buttons on the left. Your startnig balance is always 1000. You can bet 0, if you want. Then click Start Round button.
![balance](https://i.imgur.com/eZ25msO.png)

Here is your hand, and actions you can do. Hit means you are drawing card, Stand means you checking computers hand, Double means you are doubling your bet and drawing only one hand.
![userhand](https://i.imgur.com/Ykuv1Xe.png)

You can't always perform all three actions. When button on hover is gray, then you are forbidden to do this now.
![disabled](https://i.imgur.com/UXGA0lQ.png)

If the button on hover is red, then you can easili do certain action.
![enabled](https://i.imgur.com/uAmjBzs.png)

Here is opponents hand. One card is visible, one is hidden. Whenever you Stand or draw 21, computer will start playing his turn. Then results will be compared, and right amount of money will be added to your balance. 
![comphand](https://i.imgur.com/XvSc2OA.png)

After each round hands and results will be shown in the right panel.
![history](https://i.imgur.com/OpPOgEv.png)

You can always save your current game, reset game, go back to main menu or load saved game.
![menubar](https://i.imgur.com/oFwkEE8.png)

When game ends, top3 resulst of all time is shown.
![endres](https://i.imgur.com/9OM4Tdc.png)

You can chceck full rank in main menu, by clicking High Scores
![rank](https://i.imgur.com/E7YbBOf.png)



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
