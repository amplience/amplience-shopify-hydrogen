import {type Property} from 'csstype';
import ReactMarkdown from 'markdown-to-jsx';

type TextProps = {
  text: string;
  align: Property.TextAlign;
};

const Text = ({text, align}: TextProps) => {
  return (
    <div className="amp-markdown" style={{textAlign: align}}>
      {text && <ReactMarkdown>{text}</ReactMarkdown>}
    </div>
  );
};

export default Text;
