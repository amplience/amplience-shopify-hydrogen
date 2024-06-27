import {ContentClient} from 'dc-delivery-sdk-js';
import fetchAdapter from '@haverstack/axios-fetch-adapter';

interface AmplienceClientOptions {
  hubName?: string;
  stagingEnvironment?: string;
  locale?: string;
}

class AmplienceClient {
  client: ContentClient;
  constructor({hubName, stagingEnvironment, locale}: AmplienceClientOptions) {
    this.client = new ContentClient({
      hubName: hubName || '',
      stagingEnvironment: stagingEnvironment || '',
      locale,
      adaptor: fetchAdapter,
    });
  }
}

export const createAmplienceClient = ({
  hubName,
  stagingEnvironment,
  locale,
}: AmplienceClientOptions): ContentClient => {
  return new AmplienceClient({hubName, stagingEnvironment, locale}).client;
};
