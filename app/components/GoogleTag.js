import Script from "next/script";

export default function GoogleTag() {
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const primaryId = googleAdsId || gaId;

  if (!primaryId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tags-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${googleAdsId ? `gtag('config', '${googleAdsId}', { send_page_view: true });` : ""}
          ${gaId && gaId !== googleAdsId ? `gtag('config', '${gaId}', { send_page_view: true });` : ""}
        `}
      </Script>
    </>
  );
}
