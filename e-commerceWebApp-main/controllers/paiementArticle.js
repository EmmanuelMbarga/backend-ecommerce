const {PaymentOperation, RandomGenerator}=require('@hachther/mesomb');

const ApipaiementOM=async(req,res)=>{
    try {
        const payment = new PaymentOperation({applicationKey: '<f7ff8a75fa4f3c3447a985bc1e6affc46a23b190>', accessKey: '<e6efe6d4-15cc-4dbc-be70-34dd57a11be3>', secretKey: '<91546915-9b70-4f24-9f37-cbfb80b6f131>'});
        const response = await payment.makeDeposit({amount: 1500, service: 'Orange', receiver: '698397075', nonce: RandomGenerator.nonce()});
        console.log(response.isOperationSuccess());
        console.log(response.isTransactionSuccess());
        
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
    
} 

module.exports=ApipaiementOM
