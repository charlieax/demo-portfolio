import { NextjsSite, StackContext } from 'sst/constructs'

export function Web({ stack }: StackContext) {
  const web = new NextjsSite(stack, 'web', {
    path: 'packages/web/',
    customDomain: {
      domainName: `charlie.${process.env.HOSTED_ZONE}`,
      hostedZone: process.env.HOSTED_ZONE,
    },
  })

  stack.addOutputs({
    appUrl: web.customDomainUrl ?? 'http://localhost:3000',
  })
}
