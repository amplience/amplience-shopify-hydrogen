/// <reference types="@remix-run/dev" />
/// <reference types="@shopify/remix-oxygen" />
/// <reference types="@shopify/oxygen-workers-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

import type {Storefront, HydrogenCart} from '@shopify/hydrogen';
import type {
  LanguageCode,
  CountryCode,
} from '@shopify/hydrogen/storefront-api-types';
import type {CustomerAccessToken} from '@shopify/hydrogen/storefront-api-types';
import type {HydrogenSession} from './server';
import {ContentClient} from 'dc-delivery-sdk-js';

declare global {
  /**
   * A global `process` object is only available during build to access NODE_ENV.
   */
  const process: {env: {NODE_ENV: 'production' | 'development'}};

  /**
   * Declare expected Env parameter in fetch handler.
   */
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_ID: string;
    HUB_NAME: string;
    HOMEPAGE_DELIVERY_KEY: string;
    BLOG_POST_DELIVERY_KEY: string;
  }

  /**
   * The I18nLocale used for Storefront API query context.
   */
  type I18nLocale = {
    language: LanguageCode;
    country: CountryCode;
    pathPrefix: string;
  };
}

declare module '@shopify/remix-oxygen' {
  /**
   * Declare local additions to the Remix loader context.
   */
  export interface AppLoadContext {
    env: Env;
    cart: HydrogenCart;
    storefront: Storefront<I18nLocale>;
    session: HydrogenSession;
    waitUntil: ExecutionContext['waitUntil'];
    amplience: {
      hubName: string;
      locale: string;
      stagingHost: string;
      contentId: string;
      standaloneMode: boolean;
      homepageDeliveryKey: string;
      blogPostDeliveryKey: string;
    };
    amplienceClient: ContentClient;
  }

  /**
   * Declare the data we expect to access via `context.session`.
   */
  export interface SessionData {
    customerAccessToken: CustomerAccessToken;
  }
}
