import Transaction from "../models/transaction.model.js";
const transactionResolver={
    Query:{
        transactions: async(_,__, context)=>{
            try{
                if(!context.getUser()) throw new Error("Unauthorized");
                const userId= await context.getUser()._id;

                const transctions= await Transaction.find({userId});
                return transctions;
            }catch(err){
                console.log("Error getting transactions: ", err);
                throw new Error("Error getting transactions");
            }
        },

        transaction: async(_,{transactionId})=>{
            try{
                const transaction= await Transaction.findById(transactionId);
                return transaction;
            }catch(err){
                console.log("Error getting transaction:", err);
                throw new Error("Error getting transaction");
            }
        },

        categoryStatistics: async(_,__, context)=>{
            if(!context.getUser()) throw new Error("Unauthorised");

            const userId= context.getUser()._id;
            const transactions= await Transaction.find({userId});
            const categoryMap={};

            transactions.forEach((transaction)=>{
                if(!categoryMap[transaction.category]){
                    categoryMap[transaction.category]=0;
                }
                categoryMap[transaction.category]+=transaction.amount;
            })

            return Object.entries(categoryMap).map(([category,totalAmount])=> ({category, totalAmount}));
        }
    },
    Mutation: {
        createTransaction: async (_,{input}, context)=>{
            try{
                const newTransaction= new Transaction({
                    ...input,
                    userId: context.getUser()._id,
                });

                await newTransaction.save();
                return newTransaction;
            }catch(err){
                console.error("Error creating transaction", err);
                throw new Error("Error creating transactions");
            }
        },
        updateTransaction: async(_,{input})=>{
            try{
                const updatedTransaction= await Transaction.findByIdAndUpdate(input.transactionId,input,{
                    new: true,
                });
                return updatedTransaction;
            }catch(err){
                console.error("Error updating transaction: ",err);
                throw new Error("Error updating transaction");
            }
        },
        deleteTransaction: async (_,{transactionId})=>{
            try{
                const deletedTransaction= await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            }catch(err){
                console.error("Error deleting transation",err);
                throw new Error("Error deleting transaction");
            }
        }
    }
}

export default transactionResolver;