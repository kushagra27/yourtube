import React from 'react'

export default function BuyElement(props) {



    return(
        <div>
            <p>
                Seller : {props.transaction.seller}
            </p>
            <p>
                Amount : {props.transaction.amount}
            </p>
            <button
                onClick={async ()=>{
                    const db2 = await this.state.orbitdb.log('orders')
                    console.log('db :',db2)
                    await db2.load()
                    props.transaction.status = 'completed'
                    db2.add(props.transaction)
                    await props.db.del(props.transaction.timestamp)
                    alert('Done')
                }}
            >
                BUY 
            </button>
        </div>
    )
}