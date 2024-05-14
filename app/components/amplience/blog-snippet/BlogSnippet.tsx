import AmplienceContent from '../wrapper/AmplienceContent';

export type BlogSnippetProps = {
  image: any;
  title: string;
  blogdate: string;
  author: string;
  description: string;
};

const BlogSnippet = ({
  image,
  title,
  blogdate,
  author,
  description,
}: BlogSnippetProps) => {
  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(blogdate));

  return (
    <>
      <div>
        <AmplienceContent content={image}></AmplienceContent>
      </div>
      <h1>{title}</h1>
      <h2>
        {publishedDate} &middot; {author}
      </h2>
      <h3>{description}</h3>
    </>
  );
};

export default BlogSnippet;
