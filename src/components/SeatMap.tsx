import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import './SeatMap.css';
import { SeatItem } from "./SeatItem"; // Sử dụng component SeatItem bạn đã tạo

export type SeatStatus = 'free' | 'selected' | 'booked' | 'unavailable';

export interface Seat {
    id: string;
    status: SeatStatus;
    label?: string;
    customerName?: string;
    phoneNumber?: string;
    price?: number;
    // Thêm các trường mới
    topText?: string;
    subText?: string;
    subTextHighlight?: string;
    routeInfo?: string;
    seatClass?: string;
    destination?: string;
}

interface SeatMapProps {
    rows: number;
    cols: number;
    onSeatSelectionChange?: (selectedSeats: Seat[]) => void;
    seatData?: (Seat & { gridPosition: { row: number; col: number } })[];
}

export const SeatMap: React.FC<SeatMapProps> = ({
    rows,
    cols,
    onSeatSelectionChange,
    seatData = [],
}) => {
    // State để lưu trữ bản đồ ghế dưới dạng mảng 2 chiều
    const [seatMap, setSeatMap] = useState<Seat[][]>([]);

    // State để lưu trữ danh sách các ghế đang được chọn
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    // Effect để xây dựng mảng 2 chiều 'seatMap' từ 'seatData' (mảng 1 chiều)
    useEffect(() => {
        let newMap: Seat[][] = Array.from({ length: rows }, () =>
            Array(cols).fill(null).map(() => ({ id: '', status: 'unavailable' }))
        );
        seatData.forEach(seat => {
            if (seat.gridPosition.row < rows && seat.gridPosition.col < cols) {
                newMap[seat.gridPosition.row][seat.gridPosition.col] = seat;
            }
        });
        setSeatMap(newMap);
        setSelectedSeats([]); // Reset khi dữ liệu ghế thay đổi
    }, [seatData, rows, cols]);

    // Hàm xử lý khi người dùng click vào một ghế
    const handleSeatClick = (seat: Seat) => {
        if (seat.status === 'booked' || seat.status === 'unavailable') {
            return;
        }

        const isCurrentlySelected = selectedSeats.some(s => s.id === seat.id);
        let newSelectedSeats;

        if (isCurrentlySelected) {
            // Bỏ chọn ghế
            newSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
        } else {
            // Chọn ghế
            newSelectedSeats = [...selectedSeats, seat];
        }

        setSelectedSeats(newSelectedSeats);
        if (onSeatSelectionChange) {
            onSeatSelectionChange(newSelectedSeats);
        }
    };

    return (
        <Container className="seat-map-container">
            <div className="seat-map-grid" style={{ '--cols': cols } as React.CSSProperties}>
                {seatMap.flat().map((seat, index) => {
                    // Cập nhật trạng thái 'selected' cho ghế để re-render đúng
                    const isSelected = selectedSeats.some(s => s.id === seat.id);
                    const currentSeatState = {
                        ...seat,
                        status: isSelected ? 'selected' : seat.status,
                    };
                    return (
                        <SeatItem
                            key={seat.id || index}
                            seat={currentSeatState}
                            onClick={() => handleSeatClick(seat)}
                        />
                    );
                })}
            </div>

            <div className="seat-legend">
                <div className="legend-item">
                    <div className="legend-box seat-status-free"></div><span>Còn trống</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box seat-status-selected"></div><span>Đang chọn</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box seat-status-booked"></div><span>Đã đặt</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box seat-status-unavailable" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>X</div><span>Lối đi/Khác</span>
                </div>
            </div>

            {selectedSeats.length > 0 && (
                <div className="booking-summary">
                    <h5>Ghế đã chọn: <span className="text-primary fw-bold">{selectedSeats.map(s => s.label).join(', ')}</span></h5>
                    <p className="fs-5">Tổng tiền: <span className="text-danger fw-bold">{selectedSeats.reduce((total, seat) => total + (seat.price || 150000), 0).toLocaleString()} VNĐ</span></p>
                    <Button variant="success" size="lg">Xác nhận đặt vé</Button>
                </div>
            )}
        </Container>
    );
};
