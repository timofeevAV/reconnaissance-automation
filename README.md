# Reconnaissance automation

<p>
  <!-- iOS -->
  <img alt="iOS" src="https://shields.io/badge/iOS--9cf?logo=Apple&style=social" />
  <!-- Android -->
  <img alt="Android" src="https://shields.io/badge/Android--9cf?logo=Android&style=social" />
  <!-- TypeScript -->
  <img alt="Typescript" src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" />
  <!-- React -->
  <img alt="React" src="https://shields.io/badge/React--9cf?logo=React&style=social" />
  <!-- Expo -->
  <img alt="Expo" src="https://shields.io/badge/Expo--9cf?logo=Expo&style=social" />
</p>

## How to use

- Install packages with `yarn` or `npm install`
- Run `yarn prebuild` or `npm run prebuild` to start the bundler

> NOTE:\
> Create a `local.properties` file in the `android` folder and add the following line: `sdk.dir = PATH_TO_ANDROID_SDK`\
> And also follow [these](https://shopify.github.io/flash-list/docs/guides/manual-linking) instructions\
> If this is not done, the application will not launch on Android

If you wanna run the application on your physical device:

- Run `yarn start` or `npm run start` and download the Expo Go client to the appropriate device
  - iOS: [Client iOS](https://itunes.apple.com/app/apple-store/id982107779)
  - Android: [Client Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample)

If you wanna run the application on the simulator:

- iOS: `yarn ios` or `npm run ios`
- Android: `yarn android` or `npm run android`
