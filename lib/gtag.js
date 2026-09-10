// Google Ads & Google Analytics Tracking Utility

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// Log page views (useful for client-side navigations in Next.js)
export const pageview = (url) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    if (GA_ID) {
      window.gtag("config", GA_ID, {
        page_path: url,
      });
    }
    if (GOOGLE_ADS_ID) {
      window.gtag("config", GOOGLE_ADS_ID, {
        page_path: url,
      });
    }
  }
};

// Generic Google Ads / GA Event Trigger
export const trackEvent = ({ action, category, label, value, ...rest }) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...rest,
    });
  }
};

/**
 * Track Lead Form Submission Conversion
 * Fires both the specific Google Ads conversion (AW-XXXXXX/LABEL)
 * and the standard Google Analytics 'generate_lead' event.
 */
export const trackLeadConversion = ({
  formName = "contact_inquiry",
  email = "",
  phone = "",
} = {}) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  // Google Ads Conversion Action
  if (GOOGLE_ADS_ID) {
    const sendTo = GOOGLE_ADS_CONVERSION_LABEL
      ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`
      : GOOGLE_ADS_ID;
    window.gtag("event", "conversion", {
      send_to: sendTo,
      value: 1.0,
      currency: "USD",
    });
  }

  // Standard GA4 / Google Tag Lead Event
  window.gtag("event", "generate_lead", {
    form_name: formName,
    has_email: Boolean(email),
    has_phone: Boolean(phone),
  });
};

/**
 * Track Phone Call Click
 */
export const trackPhoneCall = (phoneNumber = "") => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact", {
      method: "phone",
      phone_number: phoneNumber,
    });
  }
};

/**
 * Track Email Click
 */
export const trackEmailClick = (email = "") => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact", {
      method: "email",
      email_address: email,
    });
  }
};
