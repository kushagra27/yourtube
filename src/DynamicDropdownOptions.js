import React from 'react'
import { withRouter } from 'react-router-dom'
class DynamicDropdownOptions extends React.Component {

    render(){
        const markets = this.props.markets;
        const optionItems = markets.map((market) =>
                <option value={market}>{market}</option>
            )
        return(optionItems)
    }
}

export default withRouter(DynamicDropdownOptions)