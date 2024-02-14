import React from 'react'
import "../styles/Empty.scss"
const Empty = ({ data, data1 }) => {
    return (
        <div>
            {!data1 && <div className='emtpy1'>
                Your list is empty, <br /> <br />
                Once you create a ${data} it will show here.

            </div>}
            {data1 && <div className='emtpy1'>
                did'nt match anything with your <br /> <br /> {data}, <br /> <br />
                Please search in available places.

            </div>}



        </div>
    )
}

export default Empty