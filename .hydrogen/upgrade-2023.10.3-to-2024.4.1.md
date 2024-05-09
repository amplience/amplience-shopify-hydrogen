# Hydrogen upgrade guide: 2023.10.3 to 2024.4.1

----

## Features

### Add `@shopify/mini-oxygen` as a dev dependency for local development [#1891](https://github.com/Shopify/hydrogen/pull/1891)

#### package.json
[#1891](https://github.com/Shopify/hydrogen/pull/1891)
```diff
 "devDependencies": {
    "@remix-run/dev": "^2.8.0",
    "@remix-run/eslint-config": "^2.8.0",
+   "@shopify/mini-oxygen": "^3.0.0",
    "@shopify/oxygen-workers-types": "^4.0.0",
    ...
  }
```

### Support scaffolding projects from external repositories using the `--template` flag [#1867](https://github.com/Shopify/hydrogen/pull/1867)

#### The following examples are equivalent
[#1867](https://github.com/Shopify/hydrogen/pull/1867)
```bash
npm create @shopify/hydrogen -- --template shopify/hydrogen-demo-store
npm create @shopify/hydrogen -- --template github.com/shopify/hydrogen-demo-store
npm create @shopify/hydrogen -- --template https://github.com/shopify/hydrogen-demo-store
```

### Deprecate the `<Seo />` component in favor of directly using Remix meta route exports [#1875](https://github.com/Shopify/hydrogen/pull/1875)

#### Step: 1. Remove the `<Seo />` component from `root.jsx` [#1875](https://github.com/Shopify/hydrogen/pull/1875)

[#1875](https://github.com/Shopify/hydrogen/pull/1875)
```diff
export default function App() {
   const nonce = useNonce();
   const data = useLoaderData<typeof loader>();

   return (
     <html lang="en">
       <head>
         <meta charSet="utf-8" />
         <meta name="viewport" content="width=device-width,initial-scale=1" />
-        <Seo />
         <Meta />
         <Links />
       </head>
       <body>
         <Layout {...data}>
           <Outlet />
         </Layout>
         <ScrollRestoration nonce={nonce} />
         <Scripts nonce={nonce} />
         <LiveReload nonce={nonce} />
       </body>
     </html>
   );
 }
```

#### Step: 2. Add a Remix meta export to each route that returns an seo property from a loader or handle: [#1875](https://github.com/Shopify/hydrogen/pull/1875)

[#1875](https://github.com/Shopify/hydrogen/pull/1875)
```diff
+import {getSeoMeta} from '@shopify/hydrogen';

 export async function loader({context}) {
   const {shop} = await context.storefront.query(`
     query layout {
       shop {
         name
         description
       }
     }
   `);

   return {
     seo: {
       title: shop.title,
       description: shop.description,
     },
   };
 }

+export const meta = ({data}) => {
+   return getSeoMeta(data.seo);
+};
```

#### Step: 3. Merge root route meta data [#1875](https://github.com/Shopify/hydrogen/pull/1875)

[#1875](https://github.com/Shopify/hydrogen/pull/1875)
If your root route loader also returns an seo property, make sure to merge that data:

```js
export const meta = ({data, matches}) => {
  return getSeoMeta(
    matches[0].data.seo,
    // the current route seo data overrides the root route data
    data.seo,
  );
};
```
Or more simply:

```js
export const meta = ({data, matches}) => {
  return getSeoMeta(...matches.map((match) => match.data.seo));
};
```

#### Step: 4. Override meta [#1875](https://github.com/Shopify/hydrogen/pull/1875)

[#1875](https://github.com/Shopify/hydrogen/pull/1875)
Sometimes getSeoMeta might produce a property in a way you'd like to change. Map over the resulting array to change it. For example, Hydrogen removes query parameters from canonical URLs, add them back:

```js
export const meta = ({data, location}) => {
  return getSeoMeta(data.seo).map((meta) => {
    if (meta.rel === 'canonical') {
      return {
        ...meta,
        href: meta.href + location.search,
      };
    }

    return meta;
  });
};
```

### Codegen dependencies must be now listed explicitly in package.json [#1962](https://github.com/Shopify/hydrogen/pull/1962)

#### Update package.json
[#1962](https://github.com/Shopify/hydrogen/pull/1962)
```diff
{
  "devDependencies": {
+   "@graphql-codegen/cli": "5.0.2",
    "@remix-run/dev": "^2.8.0",
    "@remix-run/eslint-config": "^2.8.0",
+   "@shopify/hydrogen-codegen": "^0.3.0",
    "@shopify/mini-oxygen": "^2.2.5",
    "@shopify/oxygen-workers-types": "^4.0.0",
    ...
  }
}
```

### Update the GraphQL config in .graphqlrc.yml to use the more modern projects structure: [#1577](https://github.com/Shopify/hydrogen/pull/1577)

#### Step: 1. This allows you to add additional projects to the GraphQL config, such as third party CMS schemas. [#1577](https://github.com/Shopify/hydrogen/pull/1577)

[#1577](https://github.com/Shopify/hydrogen/pull/1577)
```diff
-schema: node_modules/@shopify/hydrogen/storefront.schema.json
+projects:
+ default:
+    schema: 'node_modules/@shopify/hydrogen/storefront.schema.json
```

#### Step: 2. Also, you can modify the document paths used for the Storefront API queries. This is useful if you have a large codebase and want to exclude certain files from being used for codegen or other GraphQL utilities: [#1577](https://github.com/Shopify/hydrogen/pull/1577)

[#1577](https://github.com/Shopify/hydrogen/pull/1577)
 ```yaml
    projects:
      default:
        schema: 'node_modules/@shopify/hydrogen/storefront.schema.json'
        documents:
          - '!*.d.ts'
          - '*.{ts,tsx,js,jsx}'
          - 'app/**/*.{ts,tsx,js,jsx}'
    ```

### Use new `variantBySelectedOptions` parameters introduced in Storefront API v2024-01 to fix redirection to the product's default variant when there are unknown query params in the URL. [#1642](https://github.com/Shopify/hydrogen/pull/1642)

#### Update the `product` query to include the `variantBySelectedOptions` parameters `ignoreUnknownOptions` and `caseInsensitiveMatch`
[#1642](https://github.com/Shopify/hydrogen/pull/1642)
```diff
-   selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
+   selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
```

### Better Hydrogen error handling [#1645](https://github.com/Shopify/hydrogen/pull/1645)

#### Changed the shape of the error objects returned by createCartHandler. Previously, mutations could return an errors array that contained a userErrors array. With this change, these arrays are no longer nested. The response can contain both an errors array and a userErrors array. errors contains GraphQL execution errors. userErrors contains errors caused by the cart mutation itself (such as adding a product that has zero inventory). storefront.isApiError is deprecated.
[#1645](https://github.com/Shopify/hydrogen/pull/1645)
```diff
- const data = await context.storefront.query(EXAMPLE_QUERY)
+ const {data, errors, userErrors} = await context.storefront.query(EXAMPLE_QUERY) 
```

```diff
- const cart = await context.cart.get()
+ const {cart, errors, userErrors} = await context.cart.get()
```

### Add deploy command to Hydrogen CLI [#1628](https://github.com/Shopify/hydrogen/pull/1628)

#### Use the new `h2 deploy` command to deploy your app
[#1628](https://github.com/Shopify/hydrogen/pull/1628)
```bash
npx shopify hydrogen deploy --help
```

### Add `--template` flag to enable scaffolding projects based on examples from the Hydrogen repo [#1608](https://github.com/Shopify/hydrogen/pull/1608)

#### Use the new `--template` flag to scaffold your app
[#1608](https://github.com/Shopify/hydrogen/pull/1608)
```bash
npm create @shopify/hydrogen@latest -- --template multipass
```

### Make the worker runtime the default environment for the local dev and preview. [#1625](https://github.com/Shopify/hydrogen/pull/1625)

#### To access the legacy Node.js runtime, pass the --legacy-runtime flag. The legacy runtime will be deprecated and removed in a future release.
[#1625](https://github.com/Shopify/hydrogen/pull/1625)
```diff
"scripts": {
-   "dev": "shopify hydrogen dev --codegen",
+   "dev": "shopify hydrogen dev --codegen --legacy-runtime",
-    "preview": "npm run build && shopify hydrogen preview",
+    "preview": "npm run build && shopify hydrogen preview --legacy-runtime",
}
```

### Make default HydrogenSession type extensible [#1590](https://github.com/Shopify/hydrogen/pull/1590)

#### New HydrogenSession type
[#1590](https://github.com/Shopify/hydrogen/pull/1590)
```diff
import {
+ type HydrogenSession,
} from '@shopify/hydrogen';

- class HydrogenSession {
+ class AppSession implements HydrogenSession {
    ...
}
```

----

----

## Fixes

### Fix a bug where cart could be null, even though a new cart was created by adding a line item. [#1865](https://github.com/Shopify/hydrogen/pull/1865)

#### Example
[#1865](https://github.com/Shopify/hydrogen/pull/1865)
```ts
import {
  createCartHandler,
  cartGetIdDefault,
  cartSetIdDefault,
} from '@shopify/hydrogen';

const cartHandler = createCartHandler({
  storefront,
  getCartId: cartGetIdDefault(request.headers),
  setCartId: cartSetIdDefault(),
  cartQueryFragment: CART_QUERY_FRAGMENT,
  cartMutateFragment: CART_MUTATE_FRAGMENT,
});

await cartHandler.addLines([{merchandiseId: '...'}]);
// .get() now returns the cart as expected
const cart = await cartHandler.get();
```

### Update Vite plugin imports, and how their options are passed to Remix [#1935](https://github.com/Shopify/hydrogen/pull/1935)

#### vite.config.js
[#1935](https://github.com/Shopify/hydrogen/pull/1935)
```diff
-import {hydrogen, oxygen} from '@shopify/cli-hydrogen/experimental-vite';
+import {hydrogen} from '@shopify/hydrogen/vite';
+import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';

export default defineConfig({
    hydrogen(),
    oxygen(),
    remix({
-     buildDirectory: 'dist',
+     presets: [hydrogen.preset()],
      future: {
```

### Change `storefrontRedirect` to ignore query parameters when matching redirects [#1900](https://github.com/Shopify/hydrogen/pull/1900)

#### This is a breaking change. If you want to retain the legacy functionality that is query parameter sensitive, pass matchQueryParams to storefrontRedirect():
[#1900](https://github.com/Shopify/hydrogen/pull/1900)
```js
storefrontRedirect({
  request,
  response,
  storefront,
+  matchQueryParams: true,
});
```

### Fix types returned by the session object [#1869](https://github.com/Shopify/hydrogen/pull/1869)

#### In remix.env.d.ts or env.d.ts, add the following types
[#1869](https://github.com/Shopify/hydrogen/pull/1869)
```diff
import type {
  // ...
  HydrogenCart,
+ HydrogenSessionData,
} from '@shopify/hydrogen';

// ...

declare module '@shopify/remix-oxygen' {
  // ...

+ interface SessionData extends HydrogenSessionData {}
}
```

### Fix 404 not working on certain unknown and i18n routes [#1732](https://github.com/Shopify/hydrogen/pull/1732)

#### Add a `($locale).tsx` route with the following contents
[#1732](https://github.com/Shopify/hydrogen/pull/1732)
```js
import {type LoaderFunctionArgs} from '@remix-run/server-runtime';

export async function loader({params, context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are still at the default locale
    // then the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  return null;
}
```

### Use new `variantBySelectedOptions` parameters introduced in Storefront API v2024-01 to fix redirection to the product's default variant when there are unknown query params in the URL. [#1642](https://github.com/Shopify/hydrogen/pull/1642)

#### Update the `product` query to include the `variantBySelectedOptions` parameters `ignoreUnknownOptions` and `caseInsensitiveMatch`
[#1642](https://github.com/Shopify/hydrogen/pull/1642)
```diff
-   selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
+   selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
```
