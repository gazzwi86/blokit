# BlokIt
> A browser extension for blocking fake news

## Features
The app give you the chance to build a list of news sources you wish to ban.  Once it has a list of these sources, it will:

- Removes results from Google attaining to the banned domains
- Removes posts on Facebook attaining to the banned domains
- Warn you when you are navigating to a blocked website and offer chance to redirect away
- Redirect you away from banned sites on arrival

These features can be enabled and disabled according to preference, via the extensions icon.

## Install
1. From this directory run:

```npm install```

2. From there go to Google Chrome > Extensions.
3. Enable 'Developer mode'
4. Load unpacked extension
5. Select the app directory found within this project.

## Testing
Currently there has been no testing implemented, but the test folder contains Mocha and Jasmine, ready for implementation.

## Roadmap
- Update product info on chrome (screenshots, description etc)
- Define a list of banned websites? 
- Languages
- Move to ES6
- Create Safari, Firfox, Opera and IE extensions
- Remove jQuery
- Unit tests
- E2E tests
- Remove timeouts
- Performance improvements
- Create website

The following are just ideas for potential features:
- Add an add blocker
- Replace images of X to Y
