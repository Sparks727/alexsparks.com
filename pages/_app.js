import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Wireboard analytics */}
      <Script
        id="wireboard-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            ;(function(w,i,r,e,b,oar,d){if(!w[b]){w.WireBoardNamespace=w.WireBoardNamespace||[];
            w.WireBoardNamespace.push(b);w[b]=function(){(w[b].q=w[b].q||[]).push(arguments)};
            w[b].q=w[b].q||[];oar=i.createElement(r);d=i.getElementsByTagName(r)[0];oar.async=1;
            oar.src=e;d.parentNode.insertBefore(oar,d)}}(window,document,"script","https://static.wireboard.io/wireboard.js","wireboard"));
            wireboard('newTracker', 'wb', 'pipeline-0.collector.wireboard.io', {
                appId: 'JWMftPry',
                forceSecureTracker: true,
                contexts: {
                  performanceTiming: true,
                }
            });
            window.wireboard('enableActivityTracking', 5, 10);
            var customContext=[{schema:'wb:io.wireboard/publisher',data:{publisher:'f377300f-4606-40d6-b51d-6c178a8bc8c1'}}]
            window.wireboard('trackPageView', null, customContext);
          `,
        }}
      />
      <Script
        id="wireboard-verification"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            console.log("Wireboard analytics loaded with appId: JWMftPry");
            
            // Add verification for analytics tracking
            setTimeout(function() {
              if (window.wireboard && typeof window.wireboard === 'function') {
                console.log("Wireboard function available");
              } else {
                console.error("Wireboard not properly initialized");
              }
            }, 2000);
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp 