import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

// Định nghĩa các trạng thái của ghế
export type SeatStatus = 'free' | 'selected' | 'booked' | 'unavailable';

// Định nghĩa cấu trúc dữ liệu cho một ghế
export interface Seat {
    id: string; // Ví dụ: "A1", "B5"
    status: SeatStatus;
    label?: string; // Nhãn hiển thị trên ghế (ví dụ: số ghế)
    price?: number; // Giá vé (nếu có)
}

interface SeatMapProps {
    rows: number;
    cols: number;
    // Có thể truyền vào một mảng các ghế đã được đặt trước hoặc không khả dụng
    initialSeats?: Seat[][];
    // Hàm callback khi có sự thay đổi lựa chọn ghế
    onSeatSelectionChange?: (selectedSeats: Seat[]) => void;
    // Dữ liệu ghế từ bên ngoài (ví dụ: từ API hoặc hình ảnh bạn cung cấp)
    seatData?: { id: string, label: string, status: SeatStatus, gridPosition: { row: number, col: number } }[];
}

export const SeatMap: React.FC<SeatMapProps> = ({
    rows,
    cols,
    initialSeats,
    onSeatSelectionChange,
    seatData,
}) => {

    // tạo ra state có mảng 2 chiều là các SeatStatus với giá trị mặc định là 'free'
    const [seatMap, setSeatMap] = useState<Seat[][]>([]);
    // tạo ra state là mảng một chiều để chứa các ghế đã chọn
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    // khởi tạo bản đồ ghế khi component được mount hoặc props thay đổi
    useEffect(() => {
        let newSeatMap: Seat[][] = [];
        if (seatData && seatData.length > 0) {
            newSeatMap = Array.from({ length: rows }, () =>
                Array(cols).fill(null).map(() => ({ id: '', status: 'unavailable', label: '' }))
            );

            // chèn dữ liệu của seatData vào giao diện
            seatData.forEach(seat => {
                if (seat.gridPosition.col < cols && seat.gridPosition.row < rows) {
                    newSeatMap[seat.gridPosition.row][seat.gridPosition.col] = {
                        id: seat.id,
                        label: seat.label || `${String.fromCharCode(65 + seat.gridPosition.col)}${seat.gridPosition.col + 1}`,
                        status: seat.status,
                    }
                }
            })
        } else if (initialSeats) {
            newSeatMap = initialSeats;
        } else {
            // Nếu không có initialSeats hoặc seatData, tạo bản đồ ghế mặc định
            newSeatMap = Array.from({ length: rows }, (_, rowIndex) =>
                Array.from({ length: cols }, (_, colIndex) => ({
                    id: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
                    lable: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
                    status: 'available' as SeatStatus
                }))
            )
        }
        setSeatMap(newSeatMap);
    }, [rows, cols, initialSeats, seatData])

    if (seatMap.length === 0) {
        return <p>Đang tải sơ đồ ghế...</p>;
    }

    return (
        <Container className="mt-3">
            <h4 className="text-center mb-3">Sơ đồ ghế</h4>
        </Container>
    )
}