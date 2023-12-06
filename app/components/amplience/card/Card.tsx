import type {ContentItem} from '~/clients/amplience/create-dc-content-client.types';
import ReactMarkdown from 'markdown-to-jsx';
import { CmsContent } from '~/amplience/getImageURL';
import AmplienceWrapper from '../wrapper/AmplienceWrapper';

type CardProps = {
    className?: string;

    /**
     * Image Content Item
     */
    image?: CmsContent;

    /**
     * Title of the Card
     */
    cardName?: string;

    /**
     * Description
     */
    description?: string;

    /**
     * Call-to-action Links
     */
    links?: any[];
}

/**
 * Text component
 * @param param0 object containing content data
 * @returns Text component using markdown to HTML
 */
const Card: React.FC<CardProps> = ({
    image,
    cardName,
    description,
    links
  }) => {
    return (
       <div style={{width: "100%", margin: 4}}>
            <div><AmplienceWrapper content={image as CmsContent} /></div>
            <h3>{cardName}</h3>
            <p>{description}</p>
       </div> 
    )
}

export default Card;