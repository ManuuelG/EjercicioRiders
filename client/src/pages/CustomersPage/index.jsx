import * as React from 'react'
import { Link } from 'react-router-dom'
import { useCustomers } from 'hooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import customerService from 'services/customer-service'

import {
  Button,
  Stack,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
} from '@mui/material'

import { Add } from '@mui/icons-material'

import { Table } from 'components'

import CustomerMap from 'src/components/CustomerCard/Card'

function CustomersPage() {
  const { customers, loading, errors, setCustomers } = useCustomers()
  const navigate = useNavigate()

  const handleEdit = ({ _id: CustomerIdToEdit }) =>
    navigate('/customer/edit/' + CustomerIdToEdit)
  const handleDelete = ({ _id: CustomerIdToDelete }) =>
    customerService
      .delete(CustomerIdToDelete)
      .then(() =>
        setCustomers(
          customers.filter(customer => customer._id !== CustomerIdToDelete)
        )
      )
      .catch(err => {
        if (err.response.status === 400)
          setErrorsFromResponse(err.response.data)
      })

  const [view, setView] = useState('list')

  const toggleView = type => {
    setView(type)
  }

  const mosaicView = () => {
    return (
      <Grid container spacing={3}>
        {customers.map(customer => (
          <Grid item key={customer.name} xs={12} sm={6} md={4} lg={4}>
            <Card style={{ width: '90%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {customer.name}
                </Typography>
                <CustomerMap
                  latitude={customer.latitude}
                  longitude={customer.longitude}
                  style={{ height: '150px', width: '100%' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  const listView = () => {
    return (
      <Table
        columns={[
          {
            label: 'Nombre',
            path: 'name',
          },
          {
            label: 'latitude',
            path: 'latitude',
            props: {
              align: 'right',
            },
          },
          {
            label: 'longitude',
            path: 'longitude',
            props: {
              align: 'right',
            },
          },
        ]}
        rows={customers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    )
  }

  if (loading) return <CircularProgress />

  return (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2" component="h2" marginLeft="16px">
          Clientes
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            // startIcon={<Add />}
            component={Link}
            to="/"
            onClick={() => toggleView('list')}
            disabled={view === 'list'}
          >
            Vista lista
          </Button>

          <Button
            variant="contained"
            color="secondary"
            // startIcon={<Add />}
            component={Link}
            to="/"
            onClick={() => toggleView('mosaic')}
            disabled={view === 'mosaic'}
          >
            Vista Mosaico
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            component={Link}
            to="/customer/new"
          >
            Añadir Cliente
          </Button>
        </Stack>
      </Stack>

      {view === 'list' ? listView() : mosaicView()}
    </Stack>
  )
}

export default CustomersPage
