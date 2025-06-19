import './SeatMapHeader.css'

// Định nghĩa các props mà component này sẽ nhận
interface SeatMapHeaderProps {
    driverName: string;
    vehicleNumber: string;
    stats: {
        available: number;
        booked: number;
        paid: number;
    };
}
export const SeatMapHeader: React.FC<SeatMapHeaderProps> = ({ driverName, vehicleNumber, stats }) => {
    return (
        <div className="seat-map-header">
            {/* Phần chú thích màu sắc */}
            <div className="color-legend">
                <span className="legend-item" style={{ backgroundColor: '#ffff99' }}></span>
                <span className="legend-item" style={{ backgroundColor: '#28a745' }}></span>
                <span className="legend-item" style={{ backgroundColor: '#007bff' }}></span>
                <span className="legend-item" style={{ backgroundColor: '#ffc107' }}></span>
                <span className="legend-item" style={{ backgroundColor: '#dc3545' }}></span>
            </div>
            {/* Phần thông tin tài xế và thống kê */}
            <div className="info-bar">
                <div className="driver-info">
                    Tài xế: <span className="red-text">{driverName}</span> - Số xe: <span className="red-text">{vehicleNumber}</span>
                </div>
                <div className="stats-info">
                    Ghế trống: <span className="red-text">{stats.available}</span>
                    - Ghế đã đặt: <span className="red-text">{stats.booked}</span>
                    - Đã T.toán: <span className="red-text">{stats.paid}</span>
                </div>
            </div>
        </div>
    )
}