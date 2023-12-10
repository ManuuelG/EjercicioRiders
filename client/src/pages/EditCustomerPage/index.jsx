import { Stack, Typography, CircularProgress } from '@mui/material'

import { Form } from 'components'

import { useParams } from 'react-router-dom'

import { fields, schema, getDefaultValues } from './form-data'

import { useState } from 'react'

import { useCustomer } from 'hooks'

import customerService from 'services/customer-service'

function EditCustomerPage() {
  const { customerId } = useParams()
  const { customer, loading, errors } = useCustomer(customerId)

  const [errorsFromResponse, setErrorsFromResponse] = useState([])

  const onSubmit = customer => {
    customerService
      .update(customerId, customer)
      .then(() => {})
      .catch(err => {
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })
  }
  if (loading) return <CircularProgress />

  return (
    <Stack spacing={3}>
      <Typography variant="h2" component="h2">
        Editar Cliente
      </Typography>

      <Form
        inputs={fields}
        onSubmit={onSubmit}
        validationSchema={schema}
        errorsFromResponse={errorsFromResponse}
        submitLabel="Editar"
        defaultValues={getDefaultValues(customer)}
      />
    </Stack>
  )
}

export default EditCustomerPage
