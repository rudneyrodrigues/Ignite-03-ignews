import * as prismic from '@prismicio/client'

// Fill in your repository name
export const repositoryName = 'ignews-rudney'
const endpoint = prismic.getEndpoint(repositoryName)

export const client = prismic.createClient(endpoint, {
  // If your repo is private, add an access token
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,

  // This defines how you will structure URL paths in your project.
  // Update the types to match the Custom Types in your project, and edit
  // the paths to match the routing in your project.
  //
  // If you are not using a router in your project, you can change this
  // to an empty array or remove the option entirely.
  routes: [
    {
      type: 'page',
      path: '/:uid',
    },
  ],
})