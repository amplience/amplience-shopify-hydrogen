export type AmplienceVideo = {
  defaultHost: string;
  name: string;
  endpoint: string;
  track?: {
    src: string;
    lang: string;
    label: string;
  };
};
