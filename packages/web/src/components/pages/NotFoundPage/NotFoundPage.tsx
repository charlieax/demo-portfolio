import NextErrorComponent from 'next/error'

export function NotFoundPage() {
  return <NextErrorComponent statusCode={404} />
}
