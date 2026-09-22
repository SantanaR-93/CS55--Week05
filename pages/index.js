// Importing dates to blog posts
import Date from '../components/date';
// Lets this page set the document <head> (title, meta tags)
import Head from 'next/head'; 
// Next.js client-side navigation between pages (no full reload)
import Link from 'next/link'; 
// Shared page wrapper plus the site title string
import Layout, { siteTitle } from '../components/layout';
// CSS Module classes for reusable utility styles
import utilStyles from '../styles/utils.module.css';

// Named import: loads markdown posts from /posts and returns them sorted by date
import { getSortedPostsData } from '../lib/posts';
 
// Runs at build time (SSG): fetch post data once, then pass it into the page as props
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData, // becomes the allPostsData argument on Home() below
    },
  };
}

// Default export so Next.js uses this as the home page at "/"
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Hello, I'm Robert. I am a student with an interest in web development.]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <h4>
        <Link href="/posts/first-post">← Revisit first post</Link>
        </h4>
      </section>

      {/* Blog list: map over posts from getStaticProps and render a link + date for each */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            {/* Dynamic route: /posts/ssg-ssr, /posts/pre-rendering, etc. */}
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}