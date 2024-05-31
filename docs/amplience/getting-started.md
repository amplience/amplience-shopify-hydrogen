# Getting started

## Shopify configuration

Copy the `.env.example` and rename to be `.env` and populate the environment variables.

| Environment variable          | Description                                                            |
| ----------------------------- | ---------------------------------------------------------------------- |
| SESSION_SECRET                | Shopify session secret                                                 |
| PUBLIC_STORE_DOMAIN           | Shopify public store domain, <store id>.myshopify.com                  |
| PUBLIC_STOREFRONT_ID          | Storefront ID you can get from the store URL, [store_id].myshopify.com |
| PUBLIC_STOREFRONT_API_TOKEN   | API Token from the Shopify App                                         |
| PUBLIC_STOREFRONT_API_VERSION | Storefront API version, for instance 2023-01, 2024-04, ...             |

You can follow the guide on the `dc-integration-middleware` project to generate your credentials: https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/shopify.md

> Note: you can add the `unauthenticated_read_content` permission to display page content from Shopify Admin UI.

## Amplience configuration

Main Amplience configuration is set through an environment variable. You can set it locally in a `.env` file:

| Environment variable   | Description                |
| ---------------------- | -------------------------- |
| HUB_NAME               | Dynamic Content Hub Name   |
| HOMEPAGE_DELIVERY_KEY  | Slot key or the homepage   |
| BLOG_POST_DELIVERY_KEY | Delivery key for blog post |

Slot key is usually `homepage` in the case of Demostore automation.
Example blog post key from Demostore is `post/anna-barnett-for-the-love-of-food`.

### eComm Toolkit extension

From there you can update the Installation Parameters of the eComm Toolkit extension with the following:

```json
{
  "vendor": "shopify",
  "codec_params": {
    "access_token": "<access_token>",
    "admin_access_token": "<admin_access_token>",
    "site_id": "<site_id>",
    "version": "2024-04"
  }
}
```

### Content Types visualisation URL

You wil need to update / add new visualisation URLs:

- BigCommerce Catalyst Development
- BigCommerce Catalyst Production

Here is the list of Content Types to update:

- Blog
- Card
- Card List
- Curated Product Grid
- Dynamic Product Grid
- Flexible Slot
- Homepage (Site Pages hierarchy root node)
- Image
- Rich Text
- Simple Banner
- Text

The URL to use is the following:

- `http://localhost:3000/{{locales}}/visualization?content={{content.sys.id}}&vse={{vse.domain}}&hub={{hub.name}}`

You can use the provided `update-content-types` script to automatically update these Content Types with both development (https://localhost:3000) and Production visualisations. You can specify the base domain for the Production visualisation using the `--prodUrl` parameter.

You can execute the script by running:

```bash
npm run update-content-types
```

Here are the options:

```
Update Content Types

Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --hubId         amplience hub id                           [string] [required]
  --prodUrl       production url                                        [string]
  --clientId      amplience client id                        [string] [required]
  --clientSecret  amplience client secret                    [string] [required]
```

You can change the default URLs / ports in the `./config/amplience/default.js` file.
Default visualisations are stored in the `defaultVisualizations` property:

```js
defaultVisualizations: [
  {
    label: 'BigCommerce Catalyst Production',
    templatedUri:
      '{{prodUrl}}/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}',
    default: false,
  },
  {
    label: 'BigCommerce Catalyst Development',
    templatedUri:
      'https://localhost:3000/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}',
    default: false,
  },
],
```

You can also change visualisation URLs for a specific Content Type:

```js
{
  contentTypeUri: 'https://demostore.amplience.com/site/pages',
  visualizations: [
    {
      label: 'BigCommerce Catalyst Production',
      templatedUri: '{{prodUrl}}?vse={{vse.domain}}',
      default: false,
    },
    {
      label: 'BigCommerce Catalyst Development',
      templatedUri: 'https://localhost:3000?vse={{vse.domain}}',
      default: false,
    },
  ],
},
```

### Preview URL

## Install

```bash
nvm use
npm install
```

## Local development

```bash
npm run dev
```
