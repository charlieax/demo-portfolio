import { NextjsSite, StackContext } from 'sst/constructs'

export function Site({ stack }: StackContext) {
  const site = new NextjsSite(stack, 'site', {
    customDomain: `charlie.${process.env.HOSTED_ZONE}`,
  })

  stack.addOutputs({
    SiteUrl: site.url || 'http://localhost:3000',
  })
}
