# Daily Questions App

Inofficial app to follow Marshall Goldsmith's 6 Daily Questions from his book [Triggers](https://marshallgoldsmith.com/book-page-triggers/).

Check the [Readme of You are Awesome App! Daily Motivation Up!](https://github.com/proSingularity/you-are-awesome-app) on how to debug and much more.

## Deployment

See also [EAS Build Guide](https://docs.expo.dev/build/setup/).

```sh
yarn eas login
# verify you're logged in
yarn eas whoami

# build and deploy
yarn eas build --platform android

# submit to Google Playstore
# configure via eas.json
yarn eas submit --platform android

# DEBUG: https://github.com/expo/fyi/blob/main/eas-build-archive.md
```

### Old workflow

```sh
# complete rebuild
yarn build-and-publish:expo:android:app-bundle:prod
# or alternatively do an OTA update
yarn deploy:ota:prod
```

### Local installation on phone or emulator

```sh
java -jar bundletool.jar build-apks --bundle=daily-questions-signed.aab --output=daily-questions.apks --mode=universal
java -jar bundletool.jar install-apks --apks=daily-questions.apks
```

### Local .apk build

To speed up development, it is sometimes possible to build an apk without using the expo build services (Turtle). This may require some setup (like Android Studio and maybe more).

```sh
yarn build:local
```

## Development

### FAQ

#### Some redux middleware complaints when used with react-redux

##### Symptom

```log
A non-serializable value was detected in an action, in the path: `payload`. Value:, Class {
  "_dispatchInstances": FiberNode {
...
SerializableStateInvariantMiddleware took 64ms, which is more than the warning threshold of 32ms.
...
```

##### Analysis and Solution

You probably use some code like this

```tsx
<Button mode="outlined" onPress={clearHistory}>
  Clear history
</Button>
```

where `clearHistory` is an action creator injected using react-redux' `connect` and `mapDispatch`.

`onPress` seems to implicitely pass some argument to the function. So to fix the warning, explicitely ignore the argument and call your function without it like so

```tsx
<Button mode="outlined" onPress={() => clearHistory()}>
  Clear history
</Button>
```

## Licence

Code is licensed under MIT. Files under `/assets/` are **NOT** licensed under MIT. You may clone or forge the repository with the assets included but please do not distribute your app using the same images and logos. Thank you :)

## Links and Resources

- [Mobile Screen Reader Testing](https://scottvinkle.me/blogs/work/mobile-screen-reader-testing)
- [React Native Accessibility](https://www.shopify.com/partners/blog/react-native-accessibility)
