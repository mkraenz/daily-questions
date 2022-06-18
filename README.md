# Daily Questions App

Inofficial app to follow Marshall Goldsmith's 6 Daily Questions from his book [Triggers](https://marshallgoldsmith.com/product/triggers-creating-behavior-that-lasts-becoming-the-person-you-want-to-be/).

Check the [Readme of You are Awesome App! Daily Motivation Up!](https://github.com/proSingularity/you-are-awesome-app) on how to debug and much more.

## Deployment

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

### Notes on future Expo EAS

Currently EAS does not have a free tier for Over-the-air (OTA) updates. The service is called EAS Update but while it's in preview it costs a lot. Therefore, for now I'll stick with the "classic" build and "classic" OTA updates.

See also [EAS Build Guide](https://docs.expo.dev/build/setup/).

```sh
yarn eas login
# verify you're logged in
yarn eas whoami

# build and deploy
yarn eas build --platform android
```
