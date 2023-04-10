import { GetServerSidePropsContext } from 'next'

import { HomePage } from '@components/pages/HomePage'

export default HomePage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  }
}
