import {type Property} from 'csstype';
import ReactMarkdown from 'markdown-to-jsx';
import AmplienceContent from '../wrapper/AmplienceContent';
import {getImageURL} from '../image/Image.utils';
import {type AmplienceContentItem} from '~/clients/amplience/fetch-types';
import {type AmplienceImage} from '../image/Image.types';

type RichTextMarkdown = {
  type: 'markdown';
  data: string;
};

type RichTextContent = {
  type: 'dc-content-link';
  data: AmplienceContentItem;
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
                  {data && <ReactMarkdown>{data}</ReactMarkdown>}
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
