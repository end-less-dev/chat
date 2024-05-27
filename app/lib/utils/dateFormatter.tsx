import dayjs from "dayjs"
 interface DateFormatterProps {
    date : string
 }

const DateFormatter = ({ date } : DateFormatterProps)=>{
    const data = dayjs(date);
    const formattedDate = data.format('DD MMM YYYY hh:mm A');
    return <>{formattedDate}</>
}

export default DateFormatter