const { GoogleAdsApi, enums } = require('google-ads-api')

// Make sure you pass in valid authentication details!
const client = new GoogleAdsApi({
    client_id: '541455512087-4b4kco7v5ajd7sae6m44f0sd5qac6hqt.apps.googleusercontent.com',
    client_secret: 'ocW4zRzs9tq80ZvPTjy8hnJq',
    developer_token: '3xrjsEJU_9SaChCM_NUg3Q',
})

async function main() {
    const customer = client.Customer({
        customer_account_id: '546-562-3599',
        refresh_token: '1//039qexfG-iiW2CgYIARAAGAMSNwF-L9IrCt1ocUn_owhHki_fFvBY-fV2EpSD3jP1npjYF0r2JrD896Kz7g6RJYgkIsjocaOf-5o',
    })

    const campaign_budget = {
        amount_micros: 30000000,
        explicitly_shared: true,
    }
  
    try {
        console.log(campaign_budget)
        const result = await customer.campaignBudgets.create(campaign_budget)

        console.log(result)
    } catch (e) {
        console.error(e)
    }

    // try {
    //     const results = await customer.report({
    //         entity: 'customer',
    //         attributes: ['customer.id', 'customer.descriptive_name', 'customer.currency_code', 'customer.time_zone'],
    //     })

    //     for (const { customer } of results) {
    //         console.log(
    //             `Retrieved customer with ID ${customer.id}, descriptive name ${
    //                 customer.descriptive_name
    //             }, currency code ${customer.currency_code} and timezone ${customer.time_zone}`
    //         )
    //     }
    // } catch (err) {
    //     console.log(err)
    // }

    // try {
    //     const results = await customer.report({
    //         entity: 'campaign',
    //         attributes: ['campaign.id', 'campaign.name'],
    //         constraints: [{ 'campaign.status': enums.CampaignStatus.ENABLED }],
    //     })
    //     console.log("results", results)
    //     for (const { campaign } of results) {
    //         console.log(`
    //             Campaign with ID ${campaign.id} and name "${campaign.name}" was found.
    //         `)
    //     }
    // } catch (err) {
    //     console.log(err)
    // }
}

main()

const getFilePromise = async params => {
    const { Body } = await S3client.getObject(params)
    
    return Body.toString('utf-8')["_links"]["fail"];
}