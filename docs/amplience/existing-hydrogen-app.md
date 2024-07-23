# How to port Amplience into an existing Hydrogen app

This guide is aimed at existing Hydrogen apps and the steps needed to fetch and visualize Amplience content.

## Add Amplience environment variables

Update `.env.local` to include the Amplience hub you want to use:

```env
AMPLIENCE_HUBNAME=yourhubnamehere
```

## Implement the Amplience client

To fetch any content from Amplience the first thing you will need is a client to make the requests.

Install Amplience client dependencies:

```bash
npm install @haverstack/axios-fetch-adapter dc-delivery-sdk-js
```

Copy the directory `amplience-client` and its contents to the root of your catalyst app e.g.

```bash
mkdir -p '/path/to/existing-hydrogen-app/existing-hydrogen-storefront/app/clients/amplience' && cp -R '/path/to/amplience-shopify-app/app/clients/amplience/' $_
```

Update `server.ts` to create and pass the Amplience client and context. Add the following to the fetch function:

```js
const {searchParams} = new URL(request.url);
const i18n = getLocaleFromRequest(request);

const amplience = {
  locale: `${i18n.language.toLocaleLowerCase()}-${i18n.country}`,
  hubName: searchParams.get('hub') ?? env.HUB_NAME,
  stagingHost: searchParams.get('vse'),
  contentId: searchParams.get('content'),
  standaloneMode: searchParams.get('standalone') === 'true',
  homepageDeliveryKey: env.HOMEPAGE_DELIVERY_KEY,
};

const amplienceClient = createAmplienceClient({
  hubName: amplience.hubName,
  locale: amplience.locale,
  ...(amplience.stagingHost ? {stagingEnvironment: amplience.stagingHost} : {}),
});
```

And return the client in request handler `getLoadContext`:

```js
const handleRequest = createRequestHandler({
  build: remixBuild,
  mode: process.env.NODE_ENV,
  getLoadContext: () => ({
    session,
    storefront,
    cart,
    env,
    waitUntil,
    amplience, // <--- add this
    amplienceClient, // <--- and this
  }),
});
```

Modify `env.d.ts` to support the Amplience types used above

```js
interface Env {
  SESSION_SECRET: string;
  PUBLIC_STOREFRONT_API_TOKEN: string;
  PRIVATE_STOREFRONT_API_TOKEN: string;
  PUBLIC_STORE_DOMAIN: string;
  PUBLIC_STOREFRONT_ID: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_URL: string;
  PUBLIC_CHECKOUT_DOMAIN: string;
  HUB_NAME: string; // <--- Add this
}
```

```js
interface AppLoadContext {
  env: Env;
  cart: HydrogenCart;
  storefront: Storefront<I18nLocale>;
  customerAccount: CustomerAccount;
  session: AppSession;
  waitUntil: ExecutionContext['waitUntil'];
  amplience: {
    // <-- add this
    hubName: string,
    locale: string,
    stagingHost: string,
    contentId: string,
    standaloneMode: boolean,
  };
  amplienceClient: ContentClient; // <-- add this
}
```

## Fetching Amplience content on a page

With the client installed you can use it to fetch Amplience content on any page.

In a page loader function get the Amplience client from the loader context:

```js
const {amplienceClient} = context;
```

Now you can use the client to fetch content:

```js
const simpleBanner = await (
    await amplienceClient.getContentItemByKey('docs/story/simplebanner/banner1')
  ).toJSON() as DefaultContentBody;
```

## Add Amplience wrapper and components

This project uses an Amplience wrapper component and various other components to support rendering Amplience content. If you would like to use these:

Next install Amplience component depedencies:

```bash
npm install markdown-to-jsx clsx @heroicons/react
```

Copy the Amplience components directory `./components/amplience`:

```bash
cp -R '/path/to/amplience-shopify-app/app/components/amplience' '/path/to/existing-hydrogen-app/app/components/amplience'
```

Now you can render Amplience content by simply passing Amplienc content to the `AmplenceContent` component:

```js
<AmplienceContent content={simpleBanner} />
```

Make sure Amplience media can be requested by updating `createContentSecurityPolicy` options in `./app/entry.server.tsx` to include the following:

```js
{
  frameAncestors: ["'self'", 'https://app.amplience.net'],
  defaultSrc: [
    "'self'",
    'https://cdn.media.amplience.net',
    'https://cdn.static.amplience.net',
    '*.staging.bigcontent.io',
  ],
  connectSrc: [
    "'self'",
    'https://monorail-edge.shopifysvc.com',
    '*.staging.bigcontent.io',
    '*.cdn.content.amplience.net',
  ],
  shop: {
    checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
    storeDomain: context.env.PUBLIC_STORE_DOMAIN,
  },
}
```

## Using a Visualization page

If you would like to Visualise Amplience content then you will need to provide a Visualization page route. To do this:

Install Visualization dependencies:

```bash
npm install dc-visualization-sdk
```

Copy the Visualization page directory `./app/visualization` to your existing app:

```bash
cp '/path/to/amplience-shopify-app/app/routes/($locale).visualization.tsx' '/path/to/existing-hydrogen-app/app/routes/($locale).visualization.tsx'

```

And copy the Amplience visualization context:

```bash
mkdir -p /path/to/existing-hydrogen-app/app/context/ && cp -R /path/to/amplience-shopify-app/app/context/RealtimeVisualizationContext.tsx $_

```
