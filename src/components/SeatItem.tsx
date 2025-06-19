// filepath: d:\Study\Hoc_o_truong\2024_2025_NamBa\HKDN\ProjectReactTypescriptBoostrap\Project\ticket-manager\src\components\SeatItem.tsx
import React from 'react';
import { Seat as SeatData } from './SeatMap'; // Giả sử SeatMap.tsx export Seat
import './SeatMap.css'; // Sử dụng chung CSS hoặc tạo CSS riêng cho SeatItem nếu cần

interface SeatItemProps {
    seat: SeatData;
    onClick: () => void;
}

export const SeatItem: React.FC<SeatItemProps> = ({ seat, onClick }) => {

    const isBooked = seat.status === 'booked';

    // Determine background color class based on seat class
    const getSeatClassStyle = () => {
        if (!isBooked) return '';
        switch (seat.seatClass) {
            case 'late':
                return 'seat-late';
            case 'late-green':
                return 'seat-late-green';
            case 'company':
                return 'seat-company';
            default:
                return '';
        }
    };

    return (
        <div
            className={`seat seat-status-${seat.status} ${getSeatClassStyle()}`}
            onClick={onClick}
            aria-label={`Ghế ${seat.label || 'không xác định'}, trạng thái ${seat.status}`}
            role="button"
            tabIndex={seat.status === 'unavailable' ? -1 : 0}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && seat.status !== 'unavailable') onClick(); }}
        >
            {isBooked ? (
                <>
                    <div className="seat-top-bar"> {/* Sử dụng class tùy chỉnh */}
                        <div className="seat-label-box">{seat.label}</div>
                        {seat.topText && <div className="seat-top-text">{seat.topText}</div>}
                    </div>


                    <div className="seat-booked-content">
                        {/* Cột bên trái */}
                        <div className="seat-left-column">
                            <div className="seat-secondary-label">
                                {seat.subText}
                                {seat.subTextHighlight && <div className="red-text">{seat.subTextHighlight}</div>}
                            </div>
                            <div className="seat-icons">
                                <span className="seat-icon">C</span>
                                <span className="seat-icon">D</span>
                                <span className="seat-icon">In</span>
                            </div>
                        </div>
                        {/* Cột bên phải */}
                        <div className="seat-right-column">
                            {seat.routeInfo && <div className="seat-route-info">{seat.routeInfo}</div>}
                            <div className="seat-customer-name">{seat.customerName}</div>
                            <div className="seat-customer-phone">{seat.phoneNumber}</div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="seat-label-container">
                    <div className="seat-label">
                        {seat.status === 'unavailable' ? (seat.label || 'X') : seat.label}
                    </div>
                </div>
            )}
        </div>
    );
};