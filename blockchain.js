var  createHash = require('crypto');
const url = require('url');

class Block
{
    constructor(index,timestamp,transactions,proof,previous_hash)
    {
        this._index = index;
        this._timestamp = timestamp;
        this._transactions = transactions;
        this._proof = proof;
        this._previous_hash = previous_hash;
    }

    get timestamp()
    {
         return this._timestamp;
    }

    get transactions()
    {
         return this._transactions;
    }

    get proof()
    {
         return this._proof;
    }

    get previous_hash()
    {
         return this._previous_hash;
    }

    get index()
    {
         return this._index;
    }

}

class Blockchain
{
    constructor()
    {
        this._chain =  [];
        this._nodes = new Set();
        this._current_transactions = [];
        this.new_block(100,1);
        console.log(JSON.stringify(this.chain));
    }

    get chain()
    {
        return this._chain;
    }

    get nodes()
    {
        return this._nodes;
    }

    set current_transactions(transactions)
    {
        this._current_transactions = transactions;
    }

    get current_transactions()
    {
        return this._current_transactions
    }


    new_block(proof,previous_hash = null)
    {
        var that = this;
        var previous_index;
        let time = new Date();
        if (this.chain.length == 0)
        {
            previous_index = 0;
        }
        else{
            previous_index = this.chain.length -1 ;
        }
        let block = new Block(that.chain.length+1, time, that.current_transactions, previous_hash || this.hash(this.chain[previous_index]));
        console.log(block);

        this.setCurrent_transactions = [];
        this.chain.push(block);
        return block;
    }

    last_block()
    {
        if (this.chain.length == 0)
        {
            return 0;
        }
        return this.chain[this.chain.length -1];
    }

    new_transaction(sender,recipient,amount)
    {
        this.current_transactions.push(
            {
                sender: sender,
                amount: amount,
                recipient : recipient
        });
        //return the index of the next block to be mined.
        if (this.chain.length == 0)
        {
            return 1;
        }
        else
        {
            return this.chain[this.chain.length -1].index +1;
        }
        console.log (this.current_transactions);
    }

    proof_of_work(last_proof)
    {
        var proof = 0;
        while(!this.valid_proof(last_proof, proof))
        {
            proof+=1;
        }
        console.log("Proof number found " + proof);
        return proof;
    }

    valid_proof(last_proof,proof)
    {
        let guess = Buffer.from(proof.toString()).toString('base64') + Buffer.from(last_proof.toString()).toString('base64');
        var hash = createHash.createHash('sha256')
        .update(guess)
        .digest('base64');
        return hash.startsWith('0000');
    }
}

 new_transaction(sender,recipient,amount)
   {
       this.current_transactions.push(
           {
               sender: sender,
               amount: amount,
               recipient : recipient
       });
       //return the index of the next block to be mined.
       if (this.chain.length == 0)
       {
           return 1;
       }
       else
       {
           return this.chain[this.chain.length -1].index +1;
       }

       console.log (this.current_transactions);

   }

register_node(address)
{
    var parsed_url = new URL(address); // URL documentation can be found at https://nodejs.org/api/url.html#url_the_whatwg_url_api
    this._nodes.add(parsed_url);
}

}

var blockchain = new Blockchain();
module.exports = blockchain;
