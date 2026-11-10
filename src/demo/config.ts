import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'bridal-makeup-soft-proof',
  preset: sitePreset,
  business: {
    name: 'North Window Makeup Studio',
    timezone: 'America/New_York',
    email: 'hello@northwindow.example',
    phone: '+1 804-555-0147',
    address: '1708 West Main Street, Suite 3, Richmond, VA 23220',
  },
  ownerEmail: 'owner@northwindow.example',
  referencePrefix: 'NW',
  sampleNotes: [
    'Wedding in late September, outdoor ceremony at 4 pm. I love soft, glowy skin and a rosy lip — nothing too heavy around the eyes.',
    'Black-tie gala on Saturday. Navy dress. I’d like a defined smoky eye but a neutral lip.',
    'Engagement photos at golden hour next week. I usually wear very little makeup and want to still look like me.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Camille Laurent', email: 'camille.l@example.com', phone: '+1 804 555 0112' },
    { name: 'Jasmine Carter', email: 'jasmine.carter@example.com', phone: '+1 804 555 0125' },
    { name: 'Priya Raman', email: 'priya.raman@example.com', phone: '+1 804 555 0131' },
    { name: 'Olivia Brennan', email: 'olivia.b@example.com', phone: '+1 804 555 0148' },
    { name: 'Mei Tanaka', email: 'mei.tanaka@example.com', phone: '+1 804 555 0153' },
    { name: 'Danielle Ortiz', email: 'danielle.ortiz@example.com', phone: '+1 804 555 0166' },
    { name: 'Hannah Wells', email: 'hannah.wells@example.com', phone: '+1 804 555 0172' },
    { name: 'Amara Okoye', email: 'amara.okoye@example.com', phone: '+1 804 555 0184' },
    { name: 'Sophie Becker', email: 'sophie.becker@example.com', phone: '+1 804 555 0197' },
    { name: 'Lauren Mitchell', email: 'lauren.m@example.com', phone: '+1 804 555 0108' },
  ],
};
