import { availabilityDataType, getAvailabilityData } from '@/actions/availabilityAction'
import AvailabilityForm from '@/components/availability-form'
import React from 'react'
import { defaultAvailability } from './data'

async function Availability () {
  const gotUserAvailability = await getAvailabilityData() as availabilityDataType;
  console.log(gotUserAvailability);

  return (
    <div className='px-5 mt-5 '>
      <AvailabilityForm initialData={gotUserAvailability || defaultAvailability}/>
    </div>
  )
}

export default Availability