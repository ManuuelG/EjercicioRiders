import { Stack, Typography } from '@mui/material'

import { Form } from 'components'

import { fields, schema } from './form-data'

import { useState } from 'react'

import customerService from 'services/customer-service'

function AddCustomerPage() {
  const [errorsFromResponse, setErrorsFromResponse] = useState([])

  const onSubmit = (customer, { reset }) => {
    console.log('enviar', customer)
    customerService
      .create(customer)
      .then(() => reset())
      .catch(err => {
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h2" component="h2">
        Añadir nuevo Cliente
      </Typography>

      <Form
        inputs={fields}
        onSubmit={onSubmit}
        validationSchema={schema}
        errorsFromResponse={errorsFromResponse}
        submitLabel="Crear"
      />
    </Stack>
  )
}

export default AddCustomerPage
