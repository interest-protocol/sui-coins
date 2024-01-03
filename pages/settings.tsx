import { NextPage } from 'next';

import { SEO } from '@/components';
import Settings from '@/views/settings';

const SettingsPage: NextPage = () => (
  <>
    <SEO pageTitle="Settings" />
    <Settings />
  </>
);

export default SettingsPage;
