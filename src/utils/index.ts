import { mapValues } from 'lodash-es'

export const to = (promise) => promise.then((res) => [null, res]).catch((err) => [err, null])

export const decodedObj = (obj) => mapValues(obj, (value) => decodeURIComponent(value))
