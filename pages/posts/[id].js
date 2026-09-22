// Importing CSS
import utilStyles from '../../styles/utils.module.css';

// Adding date to the Post page
import Date from '../../components/date';

// Adding title to the Post page
import Head from 'next/head';

// Shared page wrapper (header, footer, home vs post layout)
import Layout from '../../components/layout';
 
// Helpers: list every post id for paths, and load one post's title/date/HTML
import { getAllPostIds, getPostData } from '../../lib/posts';
 
// Dynamic post page: Next.js fills postData via getStaticProps using the URL [id]
export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          {/* Markdown was converted to HTML in getPostData; this injects that HTML */}
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }
 
// Runs at build time: params.id comes from the URL (e.g. /posts/ssg-ssr → "ssg-ssr")
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id); // await: remark converts markdown asynchronously
   
    return {
      props: {
        postData, // passed into Post({ postData }) above
      },
    };
  }

// Tells Next.js which dynamic routes to pre-build (one HTML page per markdown file)
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths, // e.g. [{ params: { id: 'ssg-ssr' } }, { params: { id: 'pre-rendering' } }]
    fallback: false, // unknown ids (like /posts/does-not-exist) show 404
  };
}
