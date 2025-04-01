import { useState } from 'react';

function Main() {
    const [formData, setFormData] = useState([
        {
            username: 'user1',
            roomName: 'Room A',
            reserDate: '2025-04-01',
            useTime: '2 hours'
        },
        {
            username: 'user2',
            roomName: 'Room B',
            reserDate: '2025-04-02',
            useTime: '1.5 hours'
        },
        {
            username: 'user3',
            roomName: 'Room C',
            reserDate: '2025-04-03',
            useTime: '3 hours'
        },
        {
            username: 'user4',
            roomName: 'Room D',
            reserDate: '2025-04-04',
            useTime: '2.5 hours'
        },
        {
            username: 'user5',
            roomName: 'Room E',
            reserDate: '2025-04-05',
            useTime: '1 hour'
        }
    ]);

    return (
        <div>
            {formData.map((data, index) => (
                <div key={index}>
                    <p>Username: {data.username}</p>
                    <p>Room Name: {data.roomName}</p>
                    <p>Reservation Date: {data.reserDate}</p>
                    <p>Use Time: {data.useTime}</p>
                </div>
            ))}
        </div>
    );
}

export default Main;
