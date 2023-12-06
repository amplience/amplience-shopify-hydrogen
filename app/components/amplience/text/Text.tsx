import type {ContentItem} from '~/clients/amplience/create-dc-content-client.types';
import ReactMarkdown from 'markdown-to-jsx';

const Text = ({content}: {content: ContentItem}) => {
    return (
        <div className="markdown">
            {
              content?.text && <ReactMarkdown>{content.text}</ReactMarkdown>
            }
        </div>
    )
}

export default Text;