import * as yup from 'yup'

import _ from 'lodash'

const fields = [
  {
    name: 'name',
    label: 'Nombre',
    placeholder: 'Prueba placeholder',
  },
  {
    name: 'latitude',
    label: 'latitud',
    type: 'number',
  },
  {
    name: 'longitude',
    label: 'longitud',
    type: 'number',
  },
]

const schema = yup
  .object({
    name: yup.string().required('Nombre Obligatorio'),
    latitude: yup.number().typeError('Latitud Obligatoria').required(),
    longitude: yup.number().typeError('Longitud Obligatoria').required(),
  })
  .required()

const getDefaultValues = customer =>
  _.pick(customer, ['name', 'latitude', 'longitude'])

export { fields, schema, getDefaultValues }
