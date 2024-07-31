import { json } from '@remix-run/node'
import { authenticate } from '../shopify.server'

function base64ToFile(base64String, fileName) {
  // Split the base64 string to remove the data URL part
  const arr = base64String.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  // Convert binary string to byte array
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  // Create a Blob object
  const blob = new Blob([u8arr], { type: mime });

  // Create a File object
  return new File([blob], fileName, { type: mime });
}

export const action = async({request}) => {
    const { admin } = await authenticate.public.appProxy(request)
    let data = await request.formData()

    const response = await admin.graphql(
        `#graphql
            mutation populateProduct($input: ProductInput!) {
            productCreate(input: $input) {
                product {
                id
                title
                handle
                status
                variants(first: 10) {
                    edges {
                    node {
                        id
                        price
                        barcode
                        createdAt
                    }
                    }
                }
                }
            }
            }`,
        {
            variables: {
            input: {
                title: data.get("title"),
            },
            },
        },
    );
      const responseJson = await response.json();
      const variantId =
        responseJson.data.productCreate.product.variants.edges[0].node.id;
        
      const variantResponse = await admin.graphql(
        `#graphql
          mutation shopifyRemixTemplateUpdateVariant($input: ProductVariantInput!) {
            productVariantUpdate(input: $input) {
              productVariant {
                id
                price
                barcode
                createdAt
              }
            }
          }`,
        {
          variables: {
            input: {
              id: variantId,
              price: data.get("price"),
            },
          },
        },
      );
      const variantResponseJson = await variantResponse.json();
    
    const base64Image = data.get("image")
      
      const file = base64ToFile(base64Image, `image${Date.now()}.jpg`)
    
      const stagedUploadsResponse = await admin.graphql(
        `#graphql
          mutation stagedUploadsCreate($input: [StagedUploadInput!]!) {
            stagedUploadsCreate(input: $input) {
              stagedTargets {
                url
                resourceUrl
                parameters {
                  name
                  value
                }
              }
            }
          }`,
        {
          variables: {
            "input": [
              {
                "filename": file.name,
                "mimeType": file.type,
                "httpMethod": "POST",
                "resource": "IMAGE"
              }
            ]
          },
        },
      );
      const stagedUploadsResponseJson = await stagedUploadsResponse.json()
    
      const formData = new FormData();
      for(let p of stagedUploadsResponseJson.data.stagedUploadsCreate.stagedTargets[0].parameters){
        formData.append(p.name, p.value);
      }
    
      formData.append("file",file)
      await fetch("https://shopify-staged-uploads.storage.googleapis.com/", {
        method: 'POST',
        body: formData
      })
      .then(res => {
        if (res.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('File upload failed', res.statusText);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    
      const productId = responseJson.data.productCreate.product.id
      const originalSource = stagedUploadsResponseJson.data.stagedUploadsCreate.stagedTargets[0].resourceUrl
      const productMediaResponse = await admin.graphql(
        `#graphql
          mutation createProductMedia($media: [CreateMediaInput!]!, $productId: ID!) {
            productCreateMedia(media: $media, productId: $productId){
              media {
                alt
                mediaContentType
                status
              }
              mediaUserErrors {
                field
                message
              }
              product {
                id
                title
              }
            }
          }`,
          {
            variables: {
              "media": {
                "alt": "image",
                "mediaContentType": "IMAGE",
                "originalSource": originalSource
              },
              "productId": productId
            }
          }
      );
      const productMediaResponseJson = await productMediaResponse.json()

      const publicationIdRes = await admin.graphql(
        `#graphql
        query publications {
            publications(first: 5) {
            edges {
                node {
                id
                name
                }
            }
            }
        }`,
        );

        const publicationIdData = await publicationIdRes.json();
        let publicationId = null

        for(let el of publicationIdData.data?.publications.edges){
            if(el.node.name == "Online Store"){
                console.log("id -> ",el.node.id)
                console.log("name -> ",el.node.name)
                console.log("")

                publicationId = el.node.id
            }
        }

      const publishresponse = await admin.graphql(
        `#graphql
        mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
            publishable {
            availablePublicationsCount {
                count
            }
            resourcePublicationsCount {
                count
            }
            }
            shop {
            publicationCount
            }
            userErrors {
            field
            message
            }
        }
        }`,
        {
          variables: {
            "id": productId,
            "input": {
              "publicationId": publicationId
            }
          },
        },
      );
      
      const respublishresponse = await publishresponse.json();
      
    return json({"variantId":variantId})
}