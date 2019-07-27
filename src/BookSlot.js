import React from 'react'
import Calendar from 'react-calendar'
import { toHexString } from 'multihashes';
class BookSlot extends React.Component {
    constructor(){
        super()
        this.state = {
            dateStart:'',
            dateFinish:'',
            date: new Date(),
            selectedChannel:'',

        }
    }

    handleClick = async ()=>{
        console.log('clicked')
        console.log(this.state.date)
        const check = await this.props.value.channelList.get('')
        console.log(check)
        const optionChannels = check.map((item) =>
            <option value={item.channelName}>{item.channelName}</option>
        )
        console.log(optionChannels)
        this.setState({optionChannels})
    }

    selectChannel = (event)=>{
        console.log('select')
        this.setState({selectedChannel:event.target.value},()=>{
            console.log(this.state.selectedChannel)
        })
    }

    dateRangeOverlaps = (a_start, a_end, b_start, b_end) => {
        if (a_start <= b_start && b_start <= a_end) {console.log('a');return false}; // b starts in a
        if (a_start <= b_end   && b_end   <= a_end) {console.log('b');return false}; // b ends in a
        if (b_start <  a_start && a_end   <  b_end) {console.log('c');return false}; // a in b
        return true;
    }

    convertToUTC = (date)=>{
        if(date !=='')
            return Math.floor(date.getTime() / 1000)
        else console.log('err')
    }

    placeAd = async (event)=>{
        console.log('placead')
        event.preventDefault()
        const res = await this.props.value.channelList.get(this.state.selectedChannel)
        console.log(res)
            // const channelInfo = {
            //     owner:this.props.value.localAccount.address,
            //     alias:this.state.alias,
            //     channelName:this.state.channelName,
            //     email:this.state.email,
            //     bookings:[],
            //     uploads:[],
            //     subscribers:'',
            // }

        let flg = true;
        console.log(res)
        console.log(this.props.value.channelList)
        if(res[0].bookings.length>1)
        for ( let i = 0 ; i < res[0].bookings.length ; i++){
            if(this.dateRangeOverlaps(
                this.state.dateStart,
                this.state.dateFinish,
                res[0].bookings[i].dateStart,
                res[0].bookings[i].dateFinish
            )){
                continue
            } else {
                flg = false
                break;
            }
        }
        if(flg){
            console.log('available')
            const booking = {
                dateStart:this.state.dateStart,
                dateFinish:this.state.dateFinish,
                client:this.props.value.localAccount.address,
                smartContractAddress:'',
                amount:''
            }
            res[0].bookings.push(booking)
            console.log(res)
            await this.props.value.channelList.put(res[0])
            console.log(this.props.value.channelList)
        } else {
            console.log('taken')
            console.log(this.state.dateStart < res[0].bookings[0].dateStart)
        }
    }

    onChange = date => {
        this.setState({ 
            dateStart:this.convertToUTC(date[0]),
            dateFinish:this.convertToUTC(date[1]) 
            },()=>console.log(this.state.dateStart,this.state.dateFinish)
        )
    }

    render(){
        return(
            <div>
                <p>Book Slot</p>
                <button
                    onClick = {this.handleClick}
                >
                    Click Me !
                </button>
                
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    selectRange={true}
                />
                <select onChange={this.selectChannel} >
                    <option value='Select'>Select</option>
                    {this.state.optionChannels}
                </select>
            
                <button
                    onClick = {this.placeAd}
                >
                    Place Ad !
                </button>
            
            </div>
        )
    }
}

export default BookSlot