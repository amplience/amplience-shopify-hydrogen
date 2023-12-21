import ReactMarkdown from 'markdown-to-jsx';

import {getImageURL, type CmsContent} from '~/utils/amplience/getImageURL';
import AmplienceContent from '../wrapper/AmplienceContent';

type RichTextProps = CmsContent;

/**
 * Text component
 * @param text array containing markdown text, images and other components
 * @param align text alignment
 * @returns Rich Text component using markdown to HTML, displaying images and rendering other components with the Amplience Wrapper
 */
const RichText: React.FC<RichTextProps> = ({text, align = 'left', header}) => {
  return (
    <div className="amp-markdown" style={{textAlign: align}}>
      {header && <h2>{header}</h2>}
      {text &&
        text.length &&
        text.map((item: any, index: number) => {
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
