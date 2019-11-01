import React from "react"

const createTrackingSnippet = (siteId) => {
  if (!siteId) {
    throw new Error(
      "`siteId` must be provided when using the hosted version of Fathom"
    )
  }

  return `
    (function(f, a, t, h, o, m){
      a[h]=a[h]||function(){
        (a[h].q=a[h].q||[]).push(arguments)
      };
      o=f.createElement('script'),
      m=f.getElementsByTagName('script')[0];
      o.async=1; o.src=t; o.id='fathom-script';
      m.parentNode.insertBefore(o,m)
    })(document, window, '//cdn.usefathom.com/tracker.js', 'fathom');
    fathom('set', 'siteId', '${siteId}');
    fathom('trackPageview');
    fathom('set', 'spa', 'pushstate');
  `
}

const createTrackingScript = (siteId) => {
  const html = createTrackingSnippet(siteId)

  return (
    <script
      key="gatsby-plugin-fathom"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  if (process.env.NODE_ENV !== "production") return null

  const siteId = pluginOptions.siteId
  return setPostBodyComponents([createTrackingScript(siteId)])
}

export { onRenderBody }
