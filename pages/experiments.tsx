/** @jsxImportSource @emotion/react */

import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { FC } from 'react'

import { getInfo, getPosts, TInfoData, TPostData } from '../lib/api'
import Layout from '../components/layout'
import Category from '../components/category'

const getStaticProps: GetStaticProps<{ posts: TPostData[]; info: TInfoData }> = async ({
  locale,
}) => {
  const posts = await getPosts({ locale, where: { category: 'experiment' } })
  const info = await getInfo({ locale })
  const messages = require(`../locales/${locale}.json`)
  return { props: { posts, info, messages } }
}

const Experiments: FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ posts, info }) => {
  return (
    <>
      <Head>
        <title>IRESTONE.SPACE | Experiments</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout info={info}>
        <Category category='experiment' posts={posts} />
      </Layout>
    </>
  )
}

export { getStaticProps }
export default Experiments