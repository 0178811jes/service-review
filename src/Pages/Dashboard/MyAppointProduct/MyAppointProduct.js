import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthConext } from '../../../context/AuthProvider';

const MyAppointProduct = () => {
    const {user}= useContext(AuthConext);
    const url = `https://assignment-12-server-livid.vercel.app/bookings?email=${user?.email}`;

    const {data:bookings = []}=useQuery({
        queryKey:['bookings', user?.email],
        queryFn: async()=>{
            const res = await fetch(url, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem('accessToken')}`

                }
            });
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <h3 className="text-3xl mb-6">My Appointment Product</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>price</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                            <th>{i+1}</th>
                            <td>{booking.productName}</td>
                            <td>{booking.bookingDate}</td>
                            <td>{booking.price}</td>
                            <td>
                                {
                                    booking.price && !booking.paid &&
                                    <Link to={`/dashboard/payment/${booking._id}`}><button className="btn btn-primary btn-sm"
                                    >Pay</button></Link>
                                }
                                {
                                    booking.paid && booking.paid && 
                                    <span className="text-primary">Paid</span>
                                }
                            </td>
                        </tr>)
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointProduct;