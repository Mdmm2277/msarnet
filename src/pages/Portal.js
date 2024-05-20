import { Stack } from '@mui/material';
import Form from '../components/Form';
import { useAuth, useLoading } from '../shared';
import StudentPortal from './StudentPortal';
import SupervisorPortal from './SupervisorPortal';
import BusinessPortal from './BusinessPortal';
import AdminPortal from './AdminPortal';
import { useEffect, useState } from 'react';

const userTypes = {
  supervisor:'supervisor',
  student:'student',
  business: 'business',
  admin: 'admin'
}

export default function Portal() {
    const Auth = useAuth();

    return(
      <Stack sx={{flexGrow: 1}}>
        {
          Auth.LoggedIn?
          <>
            {
              Auth.UserType == userTypes.student?
              <StudentPortal />
              :
              <>
                {
                  Auth.UserType == userTypes.supervisor?
                  <SupervisorPortal />
                  :
                  <>
                  {
                    Auth.UserType == userTypes.business?
                    <BusinessPortal />
                    :
                    <>
                    {
                      Auth.UserType == userTypes.admin?
                      <AdminPortal />
                      :
                      <></>
                    }
                    </>
                  }
                  </>
                }
              </>
            }
          </>
          :
          <Form />
        }
      </Stack>
    )
}