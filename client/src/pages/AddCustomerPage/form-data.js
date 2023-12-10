import * as yup from 'yup'

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

export { fields, schema }
