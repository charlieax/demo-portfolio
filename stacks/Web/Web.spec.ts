import { Template } from 'aws-cdk-lib/assertions'
import { App, getStack } from 'sst/constructs'
import { initProject } from 'sst/project'

import { Web } from './Web'

describe('Web', () => {
  beforeAll(async () => {
    await initProject({
      stage: 'test',
    })
  })
  it('should create stack', () => {
    const app = new App({
      stage: 'test',
      mode: 'deploy',
    })
    app.stack(Web)
    Template.fromStack(getStack(Web))
  })
})
