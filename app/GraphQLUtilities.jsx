const getAppInstallationId = async (admin) => {
    let res = await admin.graphql(
      `query {
        currentAppInstallation {
          id
        }
      }`)
    res = (await res.json()).data.currentAppInstallation.id
    return res
}
const updateMetafield = async (admin, data) => {
    const response = await admin.graphql(
        `#graphql
        mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafieldsSetInput) {
                metafields {
                    id
                    namespace
                    key
                }
                userErrors {
                    field
                    message
                }
            }
        }`,
        {
            variables: {
                "metafieldsSetInput": [
                  {
                    "namespace": "neonify",
                    "key": "data",
                    "type": "json",
                    "value": JSON.stringify(data),
                    "ownerId": await getAppInstallationId(admin)
                  }
                ]
            }
        }
    );
    const resData = await response.json()
}
export const getMetafield = async (admin) => {
    let res = await admin.graphql(
      `query {
        currentAppInstallation {
          metafield(namespace:"neonify", key: "data"){
            value
          }
        }
      }`)
    res = (await res.json()).data.currentAppInstallation.metafield
    return res ? res.value : null
}
export const addSection = async (admin, newdata, type) => {
    const data = JSON.parse(await getMetafield(admin)) || []
    newdata.id = (new Date()).getTime()
    newdata.type = type
    data.push(newdata)

    await updateMetafield(admin, data)
    return JSON.parse(await getMetafield(admin)) || []
}

export const editTextArea = async (admin, newdata) => {
  const data = JSON.parse(await getMetafield(admin)) || []

  const object = data.find(obj => obj.id == newdata.id)

  object && Object.assign(object, {...object, ...newdata});

  await updateMetafield(admin, data)
  return Object
}

export const deleteItems = async (admin, ids) => {
  const data = JSON.parse(await getMetafield(admin)) || []

  let newData = data.filter(object => !ids.includes(object.id))
  await updateMetafield(admin, newData)

  return newData
}