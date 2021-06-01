/** @jsxImportSource @emotion/react */

import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { FC } from 'react'
import { useRouter } from 'next/dist/client/router'

import { getInfo, getPosts, TInfoData, TPostData } from '../../lib/api'
import Layout from '../../components/layout'
import Post from '../../components/post'

const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts({ locale: 'all' })
  const paths = posts.map(({ slug, locale }) => ({ params: { slug }, locale }))
  return { paths, fallback: true }
}

const getStaticProps: GetStaticProps<{ post: TPostData; info: TInfoData }> = async ({
  locale,
  params,
}) => {
  if (!params?.slug) throw new Error('No params')
  const [post] = await getPosts({ locale, where: { slug: params.slug } })
  if (!post) throw new Error('Could not find the post')
  const info = await getInfo({ locale })
  const messages = require(`../../locales/${locale}.json`)
  return { props: { post, info, messages }, revalidate: 1 }
}

const BlogPost: FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ post, info }) => {
  const router = useRouter()
  if (router.isFallback) return null
  return (
    <>
      <Head>
        <title>{`IRESTONE.SPACE | ${post.title}`}</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout info={info}>
        <Post post={post} />
      </Layout>
    </>
  )
}

export { getStaticPaths, getStaticProps }
export default BlogPost