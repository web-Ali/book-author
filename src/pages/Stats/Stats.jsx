import React, {useState} from 'react';
import StatisticsContainer from "../../containers/Statistics/StatisticsContainer";
import DatePicker from "react-date-picker";

const Stats = () => {
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())

    return (
        <div className='container  pt-4'>
            <div className='text-center content'>

                <div className='d-inline-block'>
                    <span style={{fontStyle: 'italic', fontSize: 22,}}>Start: </span>
                    <DatePicker
                        className='me-4 stats'
                        onChange={setDateStart}
                        value={dateStart}
                    />
                </div>
                <div className='d-inline-block'>
                    <span style={{fontStyle: 'italic', fontSize: 22,}}>End: </span>
                    <DatePicker
                        className='me-4 stats'
                        onChange={setDateEnd}
                        value={dateEnd}
                    />
                </div>
            </div>
            <div className='content'>
                <StatisticsContainer
                    start={dateStart.getFullYear() + '.' + (dateStart.getMonth() + 1) + '.' + dateStart.getDate()}
                    end={dateEnd.getFullYear() + '.' + (dateEnd.getMonth() + 1) + '.' + dateEnd.getDate()}/>
            </div>
        </div>
    );
};

export default Stats;