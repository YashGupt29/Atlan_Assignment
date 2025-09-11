import React from 'react'
import { Info } from './(organisation)/_components/info';
import OrganizationLayout from './(organisation)/organisationLayout';
import OrganizationIdPage from './(organisation)/_components/organisationId';

const DashboardPage = () => {
  return (
    <div className='flex mx-auto'>
      <OrganizationLayout/>
      <OrganizationIdPage/>
    </div>
  )
}

export default DashboardPage;