# Visualization

To get an idea of what your unpublished content will look like we provide some tooling to "visualize" content on a page.

## Using the visualization route

As the components can be in any location, we have set up a specific Visualization route which is used to visualize individual content items as you are editing. An example of this would be:

`https://<your-app-domain-here>/en-US/visualization?content=<your-content-id>&vse=<your-vse-domain>&hub=<your-hub-name>`

This route can be added to the Visualizations of your Amplience Content Types:

`https://<your-app-domain-here>/{{locales}}/visualization?content={{content.sys.id}}&vse={{vse.domain}}&hub={{hub.name}}`

### Real Time Visualization

To allow you to see changes as they are made we use the Amplience [Real Time visualisation SDK](https://github.com/amplience/dc-visualization-sdk) so any changes to your content can be viewed in real time as you edit.

### Standalone mode

Sometimes it is preferable to see a component in isolation, without headers, footers, etc. To enable standalone mode you can pass an additional query string param: `standalone=true`.
