'use client'

import Script from 'next/script'

const CONTAINER_ID = 'feedback-button-container'
const FORM_ID = 'XLqG6eTH'
const popUpPosition = 'top-left'

export const EmbeddedFeedbackButton = () => (
  <>
    <iframe
      src={`https://makeform.ai/e/${FORM_ID}`}
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '340px',
        visibility: 'hidden',
      }}
    />
    <Script
      src={`https://makeform.ai/feedback-bundle.js`}
      strategy="lazyOnload"
      // @ts-expect-error script attributes are injected by external script
      containerId={CONTAINER_ID}
      position={popUpPosition}
      formId={FORM_ID}
      buttonClassName={"pl-4 pr-2 pt-2 pb-1 rounded-tl-2xl bg-white border border-gray-200 text-sm hover:text-purple-700 hover:scale-110 transition-all duration-300"}
    />
    <div id={CONTAINER_ID} />
  </>
)

