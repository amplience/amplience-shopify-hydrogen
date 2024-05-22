# Amplience API

In order for any area of the application to be able to request content from Amplience we are using the Amplience Delivery SDK.

You can use the methods in `ContentClient` to get content by id or by key.

Getting content by id:

```js
await amplienceClient.getContentItemById(contentId);
```

Getting content by key:

```js
await amplienceClient.getContentItemByKey(amplience.flexibleSlotKey);
```

You can instantiate an Amplience Client using your account details and then get content. For instance:

```js
const amplienceClient = createAmplienceClient({
  hubName: amplience.hubName,
  locale: amplience.locale,
  ...(amplience.stagingHost ? {stagingEnvironment: amplience.stagingHost} : {}),
});
```
