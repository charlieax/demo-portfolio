import { NextjsSite, StackContext } from 'sst/constructs'

export function Web({ stack }: StackContext) {
  const web = new NextjsSite(stack, 'web', {
    customDomain: `charlie.${process.env.HOSTED_ZONE}`,
  })

  stack.addOutputs({
    SiteUrl: web.url || 'http://localhost:3000',
  })
}
