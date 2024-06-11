# Amplience Components

## Amplience Components list

| Schema Id                                                    | React Component in `/app/components/amplience` | Description                                                         |
| ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------- |
| https://demostore.amplience.com/content/curated-product-grid | `./curated-product-grid/CuratedProductGrid`    | A list of manually curated products from Shopify                    |
| https://demostore.amplience.com/content/dynamic-product-grid | `./dynamic-product-grid/DynamicProductGrid`    | A list of manually dynamic products from Shopify                    |
| https://demostore.amplience.com/content/simple-banner        | `./simple-banner/SimpleBanner`                 | A basic banner with a dynamic image and a block of text             |
| https://demostore.amplience.com/content/image                | `./image/Image`                                | A basic image component                                             |
| https://demostore.amplience.com/content/text                 | `./image/Text`                                 | A basic text component using markdown                               |
| https://demostore.amplience.com/content/blog                 | `./blog/Blog`                                  | Blog component including a Blog snippet and a list of content items |
| https://demostore.amplience.com/content/blog-snippet         | `./blog-snippet/BlogSnippet`                   | Blog details component (date, title, etc.)                          |

## Amplience Components rendering

The components above all have a rendering UI. All the other Content Types from Demostore renders as JSON.

![JSON Rendering](./media/json-rendering.png)

### How to add a new component render

You can handle new components by adding their schemas in the `app/components/amplience/wrapper/AmplienceContent.tsx` file:

```js
const COMPONENT_MAPPING: {
  [key: string]: React.FC<any>;
} = {
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/video': Video,
  'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
  'https://demostore.amplience.com/content/card': Card,
  'https://demostore.amplience.com/content/card-list': CardList,
  'https://demostore.amplience.com/content/split-block': SplitBlock,
  'https://demostore.amplience.com/content/container': Container,
  'https://demostore.amplience.com/content/content-page': Container,
  'https://demostore.amplience.com/content/rich-text': RichText,
  'https://demostore.amplience.com/content/product': RichText,
  'https://demostore.amplience.com/content/curated-product-grid':
    CuratedProductGrid,
  'https://demostore.amplience.com/content/product-grid': DynamicProductGrid,
  'https://demostore.amplience.com/content/blog': Blog,
  'https://demostore.amplience.com/content/blog-snippet': BlogSnippet,
  'https://demostore.amplience.com/slots/flexible': FlexibleSlot,
};
```
