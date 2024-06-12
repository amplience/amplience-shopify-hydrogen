import {type Property} from 'csstype';
import ReactMarkdown from 'markdown-to-jsx';
import AmplienceContent from '../wrapper/AmplienceContent';
import {getImageURL} from '../image/Image.utils';
import {type AmplienceImage} from '../image/Image.types';
import type {DefaultContentBody} from 'dc-delivery-sdk-js';
import {Link} from '@remix-run/react';

type RichTextMarkdown = {
  type: 'markdown';
  data: string;
};

type RichTextContent = {
  type: 'dc-content-link';
  data: DefaultContentBody;
};

type RichTextImage = {
  type: 'dc-image-link';
  data: AmplienceImage;
};

type RichTextType = RichTextMarkdown | RichTextContent | RichTextImage;

type RichTextProps = {
  text: RichTextType[];
  align?: Property.TextAlign;
  header: string;
};

const RichText = ({text, align = 'left', header}: RichTextProps) => {
  const options = {
    overrides: {
      a: {component: Link},
      h1: {
        component: ({...props}) => (
          <h1 className="mb-4 mt-4 text-3xl font-black lg:text-5xl">
            <span {...props} />
          </h1>
        ),
      },
      h2: {
        component: ({...props}) => (
          <h2 className="mb-4 mt-4 text-2xl font-black lg:text-4xl">
            <span {...props} />
          </h2>
        ),
      },
      h3: {
        component: ({...props}) => (
          <h3 className="mb-4 mt-4 text-xl font-black lg:text-3xl">
            <span {...props} />
          </h3>
        ),
      },
      h4: {
        component: ({...props}) => (
          <h4 className="mb-4 mt-4 text-xl font-black lg:text-2xl">
            <span {...props} />
          </h4>
        ),
      },
      h5: {
        component: ({...props}) => (
          <h5 className="mb-4 mt-4 text-xl font-black lg:text-xl">
            <span {...props} />
          </h5>
        ),
      },
      h6: {
        component: ({...props}) => (
          <h5 className="mb-4 mt-4 font-black">
            <span {...props} />
          </h5>
        ),
      },
      li: {
        component: ({...props}) => (
          <li>
            <span {...props} />
          </li>
        ),
      },
    },
  };

  return (
    <div
      className="[&_ul]:block [&_ul]:list-disc [&_ul]:ps-[40px] [&_ul]:ms-[0px] [&_ul]:me-[0px] [&_img]:w-full [&_p]:my-2.5"
      style={{textAlign: align}}
    >
      {header && <h2>{header}</h2>}
      {text &&
        text.length &&
        text.map((item: RichTextType, index: number) => {
          const {type, data} = item;

          switch (type) {
            case 'markdown':
              return (
                <div key={index} className="my-5" style={{textAlign: align}}>
                  {data && (
                    <ReactMarkdown options={options}>{data}</ReactMarkdown>
                  )}
                </div>
              );
            case 'dc-content-link':
              return data && <AmplienceContent key={index} content={data} />;
            case 'dc-image-link':
              return (
                data && (
                  <picture key={data.name}>
                    <img
                      src={getImageURL(data, {strip: true})}
                      alt={data.name}
                    />
                  </picture>
                )
              );
            default:
              return null;
          }
        })}
    </div>
  );
};

export default RichText;
