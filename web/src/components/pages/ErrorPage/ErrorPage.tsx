import NextErrorComponent, { ErrorProps } from 'next/error'

export function ErrorPage(props: ErrorProps) {
  return <NextErrorComponent statusCode={props.statusCode} />
}
