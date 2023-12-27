import {type Property} from 'csstype';
import ReactMarkdown from 'markdown-to-jsx';
import AmplienceContent from '../wrapper/AmplienceContent';
import {getImageURL} from '../image/Image.utils';
import {type AmplienceContentItem} from '~/clients/amplience/fetch-content';
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
    <div className="amp-markdown" style={{textAlign: align}}>
      {header && <h2>{header}</h2>}
      {text &&
        text.length &&
        text.map((item: RichTextType, index: number) => {
          const {type, data} = item;

          switch (type) {
            case 'markdown':
              return (
                <div
                  key={index}
                  className="amp-dc-text"
                  style={{textAlign: align}}
                >
                  {data && <ReactMarkdown>{data}</ReactMarkdown>}
                </div>
              );
            case 'dc-content-link':
              return data && <AmplienceContent key={index} content={data} />;
            case 'dc-image-link':
              return (
                data && (
                  <picture key={data.name} className="amp-dc-image">
                    <img
                      src={getImageURL(data, {strip: true})}
                      className="amp-dc-image-pic"
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
