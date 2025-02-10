import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'km'],
  // Used when no locale matches
  defaultLocale: 'km'
  
});
export const i18n = {
  locales: ['en', 'km'],
  defaultLocale: 'km',
  localeDetection: true,
};
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);