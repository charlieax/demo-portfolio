import { SSTConfig } from 'sst'

import { Web } from '@stacks/Web'

export default {
  config() {
    return {
      name: 'portfolio-app',
      region: 'eu-west-2',
    }
  },
  stacks(app) {
    app.stack(Web)
  },
} satisfies SSTConfig
