import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({ requestLocale }) => {
    // The `requestLocale` typically corresponds to the `[locale]` segment of your URL (e.g., '/en' or '/kh')
    let locale = await requestLocale; // Get the requested locale (from the URL)
  
    // Ensure that a valid locale is used (if no valid locale is found, use the default locale)
    if (!locale || !routing.locales.includes(locale as any)) {
      locale = routing.defaultLocale; // Fallback to the default locale
    }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}/${locale}.json`)).default
  };
});