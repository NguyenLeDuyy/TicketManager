import React, { useState, useMemo, useEffect } from "react";
import { SchedulePanel, TimeSlot } from "../components/SchedulePanel";
import { Col, Container, Row } from "react-bootstrap";
import { SeatMap, Seat } from "../components/SeatMap";
import { generateSeatLayout, LayoutConfig } from "../utils/seatLayoutGenerator";
import { SeatMapHeader } from "../components/SeatMapHeader";

// Định nghĩa cấu hình layout cho xe khách dựa theo hình
const coachLayoutConfig: LayoutConfig = {
    type: 'coach',
    rows: 9,
    cols: 4,
};


const fullCoachSeatData: (Seat & { gridPosition: { row: number; col: number } })[] = [
    // Hàng 1
    { id: '0-0', label: 'Tài', status: 'unavailable', gridPosition: { row: 0, col: 0 } },
    { id: '0-1', label: 'Xế', status: 'unavailable', gridPosition: { row: 0, col: 1 } },
    { id: '0-2', label: '1A', status: 'booked', topText: 'Ks Hàm Luông', subText: 'bt.ly', subTextHighlight: '1R', routeInfo: 'BTE - HCM', customerName: 'TUYẾN', phoneNumber: '0974552535', gridPosition: { row: 0, col: 2 } },
    { id: '0-3', label: '1B', status: 'booked', subText: 'Bt.my', routeInfo: 'BTE - HCM', customerName: 'TÚ', phoneNumber: '0918341325', gridPosition: { row: 0, col: 3 } },
    // Hàng 2
    { id: '1-0', label: '2', status: 'booked', subText: 'bt.ly', routeInfo: 'BTE - HCM', customerName: 'QUYỀN', phoneNumber: '0382835308', gridPosition: { row: 1, col: 0 } },
    { id: '1-1', label: '3', status: 'booked', subText: 'Bt.my', routeInfo: 'BTE - HCM', customerName: 'THÚY', phoneNumber: '0985952208', gridPosition: { row: 1, col: 1 } },
    { id: '1-2', label: 'X', status: 'unavailable', gridPosition: { row: 1, col: 2 } },
    { id: '1-3', label: '5', status: 'booked', subText: 'bt.hieu', subTextHighlight: 'CS', routeInfo: 'BTE - HCM', customerName: 'TÚ', phoneNumber: '0918341325', gridPosition: { row: 1, col: 3 } },
    // Hàng 3
    { id: '2-0', label: '6', status: 'booked', seatClass: 'late', subText: 'bt.ly', routeInfo: '2G - BTE - HCM', customerName: 'mun', phoneNumber: '0919454451', gridPosition: { row: 2, col: 0 } },
    { id: '2-1', label: '7', status: 'booked', seatClass: 'late-green', topText: 'DD sacombank TG', subText: 'bt.ly', routeInfo: '2G - BTE - HCM', customerName: 'mun', phoneNumber: '0919454451', gridPosition: { row: 2, col: 1 } },
    { id: '2-2', label: 'Cửa', status: 'unavailable', gridPosition: { row: 2, col: 2 } },
    { id: '2-3', label: 'Lên', status: 'unavailable', gridPosition: { row: 2, col: 3 } },
    // Hàng 4
    { id: '3-0', label: '9', status: 'booked', subText: 'bt.bichly', routeInfo: '2G - BTE - HCM', customerName: 'MAI', phoneNumber: '0925099049', gridPosition: { row: 3, col: 0 } },
    { id: '3-1', label: '10', status: 'booked', subText: 'bt.bichly', routeInfo: '2G - BTE - HCM', customerName: 'MAI', phoneNumber: '0925099049', gridPosition: { row: 3, col: 1 } },
    { id: '3-2', label: '11', status: 'booked', subText: 'bt.bichly', subTextHighlight: 'TT', routeInfo: '2G - BTE - HCM', customerName: 'nghia', phoneNumber: '0937795978', gridPosition: { row: 3, col: 2 } },
    { id: '3-3', label: '12', status: 'booked', subText: 'bt.bichly', subTextHighlight: 'TT', routeInfo: '2G - BTE - HCM', customerName: 'nghia', phoneNumber: '0937795978', gridPosition: { row: 3, col: 3 } },
    // Hàng 5
    { id: '4-0', label: '13', status: 'booked', subText: 'bt.bichly', subTextHighlight: 'R', routeInfo: '2G - BTE - HCM', customerName: 'THÀNH', phoneNumber: '0919493968', gridPosition: { row: 4, col: 0 } },
    { id: '4-1', label: '14', status: 'booked', subText: 'bt.bichly', subTextHighlight: 'R', routeInfo: '2G - BTE - HCM', customerName: 'THÀNH', phoneNumber: '0919493968', gridPosition: { row: 4, col: 1 } },
    { id: '4-2', label: '15', status: 'booked', seatClass: 'company', topText: 'LN', subText: 'Bt.my', subTextHighlight: 'GX.R', routeInfo: '2G - BTE - HCM', customerName: 'SANG', phoneNumber: '0939866786', gridPosition: { row: 4, col: 2 } },
    { id: '4-3', label: '16', status: 'booked', seatClass: 'company', topText: 'LN', subText: 'Bt.my', subTextHighlight: 'GX.R', routeInfo: '2G - BTE - HCM', customerName: 'SANG', phoneNumber: '0939866786', gridPosition: { row: 4, col: 3 } },
    // Hàng 6
    { id: '5-0', label: '17', status: 'booked', subText: 'bt.ly', routeInfo: 'BTE - HCM', customerName: 'kiệt', phoneNumber: '0908992687', gridPosition: { row: 5, col: 0 } },
    { id: '5-1', label: '18', status: 'booked', subText: 'Bt.my', routeInfo: 'BTE - HCM', customerName: 'DUYÊN', phoneNumber: '0946921867', gridPosition: { row: 5, col: 1 } },
    { id: '5-2', label: '19', status: 'booked', seatClass: 'late-green', topText: 'Cầu Ba Lai Cũ', subText: 'bt.bichly', routeInfo: '2G - BTE - HCM', customerName: 'TÂM', phoneNumber: '0816481039', gridPosition: { row: 5, col: 2 } },
    { id: '5-3', label: '20', status: 'booked', seatClass: 'late-green', topText: 'Cầu Ba Lai Cũ', subText: 'bt.bichly', routeInfo: '2G - BTE - HCM', customerName: 'TÂM', phoneNumber: '0816481039', gridPosition: { row: 5, col: 3 } },
    // Hàng 7
    { id: '6-0', label: '21', status: 'booked', seatClass: 'late', subText: 'Bt.my', subTextHighlight: 'R', routeInfo: 'BTE - HCM', customerName: 'THI', phoneNumber: '0939270160', gridPosition: { row: 6, col: 0 } },
    { id: '6-1', label: '22', status: 'booked', seatClass: 'company', topText: 'CƠ SỞ CHIẾN P7', subText: 'bt.hieu', subTextHighlight: 'R', routeInfo: 'BTE - HCM', customerName: 'HẠNH', phoneNumber: '0358747900', gridPosition: { row: 6, col: 1 } },
    { id: '6-2', label: '23', status: 'booked', seatClass: 'late-green', topText: 'NHÀ VĂN HÓA CT', subText: 'bt.bichly', subTextHighlight: '020870023', routeInfo: 'BTE - HCM', customerName: 'NHI', phoneNumber: '0345669973', gridPosition: { row: 6, col: 2 } },
    { id: '6-3', label: '24', status: 'booked', seatClass: 'late', topText: 'HỒ BƠI THANH TRÚC', subText: 'Bt.my', subTextHighlight: 'R', routeInfo: 'BTE - HCM', customerName: 'CHƯƠNG', phoneNumber: '0949937998', gridPosition: { row: 6, col: 3 } },
    // Hàng 8
    { id: '7-0', label: '25', status: 'booked', seatClass: 'company', topText: 'Lan Vương', subText: 'bt.hieu', subTextHighlight: 'R', routeInfo: '2G - BTE - HCM', customerName: 'sang', phoneNumber: '0945005733', gridPosition: { row: 7, col: 0 } },
    { id: '7-1', label: '26', status: 'booked', seatClass: 'company', topText: 'Lan Vương', subText: 'bt.hieu', subTextHighlight: 'R', routeInfo: '2G - BTE - HCM', customerName: 'sang', phoneNumber: '0945005733', gridPosition: { row: 7, col: 1 } },
    { id: '7-2', label: '27', status: 'booked', seatClass: 'late-green', topText: 'DS2 CHỢ CHÙA', subText: 'bt.hieu', routeInfo: 'BTE - HCM', customerName: 'PHI', phoneNumber: '0907147079', gridPosition: { row: 7, col: 2 } },
    { id: '7-3', label: '28', status: 'booked', subText: 'bt.ly', routeInfo: 'BTE - HCM', customerName: 'UYÊN', phoneNumber: '0939892921', gridPosition: { row: 7, col: 3 } },
    // Hàng 9 - Giả sử là ghế trống nếu có
    { id: '8-0', label: '29', status: 'free', gridPosition: { row: 8, col: 0 } },
    { id: '8-1', label: '30', status: 'free', gridPosition: { row: 8, col: 1 } },
    { id: '8-2', label: '31', status: 'free', gridPosition: { row: 8, col: 2 } },
    { id: '8-3', label: '32', status: 'free', gridPosition: { row: 8, col: 3 } },
];


// Dữ liệu giả cho các khung giờ
const initialTimeSlots: TimeSlot[] = [
    { time: '14:00', status: 'available', info: '28/33' },
    { time: '14:15', status: 'available', info: '22/28 (ĐS-XM)' },
    { time: '14:16', status: 'available', info: '18/28' },
    { time: '14:30', status: 'available', info: '24/33' },
    { time: '14:45', status: 'available', info: '21/28 (XM)' },
    { time: '15:00', status: 'available', info: '25/33 (XM)' },
    { time: '15:15', status: 'full', info: '28/28 (ĐS)' },
    { time: '15:30', status: 'available', info: '19/33 (XM)' },
    { time: '15:45', status: 'available', info: '15/28' },
];

export const CoachBooking: React.FC = () => {
    const availableRoutes = ["Bến Tre - Sài Gòn", "Sài Gòn - Bến Tre"];
    const [selectedRoute, setSelectedRoute] = useState<string>(availableRoutes[0]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

    // Tạo layout ghế ban đầu bằng useMemo
    const baseSeatLayout = useMemo(() => generateSeatLayout(coachLayoutConfig), []);

    // State để lưu trữ dữ liệu ghế hiện tại (bao gồm cả thông tin khách hàng)
    const [currentSeatData, setCurrentSeatData] = useState(baseSeatLayout);

    const seatStats = useMemo(() => {
        const stats = {
            available: 0,
            booked: 0,
            paid: 0,
        };
        fullCoachSeatData.forEach(seat => {
            if (seat.status === 'free') {
                stats.available++;
            } else if (seat.status === 'booked') {
                stats.booked++;
            }
        });
        // TODO: Logic tính ghế "Đã thanh toán" cần được làm rõ hơn từ dữ liệu.
        // Ở đây tạm thời hardcode con số 20 để khớp với yêu cầu trong hình.
        // Bạn nên thay đổi logic này khi có trường dữ liệu `isPaid` chẳng hạn.
        stats.paid = 20;
        return stats;
    }, []);

    // Giả lập việc tải dữ liệu khách hàng khi chọn một giờ mới
    useEffect(() => {
        if (selectedTime) {
            console.log(`Đang tải dữ liệu cho giờ ${selectedTime}...`);
            // ---- PHẦN GIẢ LẬP TẢI DỮ LIỆU ----
            const bookedSeatsInfo = [
                { id: '1-0', customerName: 'NGUYỄN A', phoneNumber: '090xxxx' },
                { id: '3-1', customerName: 'TRẦN B', phoneNumber: '091xxxx' },
            ];

            const updatedData = baseSeatLayout.map(seat => {
                const bookedInfo = bookedSeatsInfo.find(b => b.id === seat.id);
                if (bookedInfo) {
                    return {
                        ...seat,
                        status: 'booked' as const,
                        customerName: bookedInfo.customerName,
                        phoneNumber: bookedInfo.phoneNumber
                    };
                }
                return seat;
            });
            setCurrentSeatData(updatedData);
            // ---- KẾT THÚC PHẦN GIẢ LẬP ----
        } else {
            setCurrentSeatData(baseSeatLayout); // Reset về layout gốc khi không chọn giờ nào
        }
    }, [selectedTime, baseSeatLayout]);

    const handleSeatSelection = (seats: Seat[]) => {
        console.log("Ghế đã chọn:", seats.map(s => s.label));
        setSelectedSeats(seats);
    };

    // ... các hàm xử lý khác ...
    const handleRouteSelect = (route: string) => setSelectedRoute(route);
    const handleDateChange = (newDate: Date) => setSelectedDate(newDate);
    const handleTimeSelect = (time: string) => setSelectedTime(time === selectedTime ? null : time);

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col md={3}>
                    <SchedulePanel
                        routes={availableRoutes}
                        selectedRoute={selectedRoute}
                        onRouteSelect={handleRouteSelect}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        timeSlots={timeSlots}
                        selectedTime={selectedTime}
                        onTimeSelect={handleTimeSelect}
                    />
                </Col>
                <Col md={9}>
                    <h4 className="mb-3">Tuyến: {selectedRoute}</h4>
                    <SeatMapHeader
                        driverName="CHẤN"
                        vehicleNumber="460"
                        stats={seatStats}
                    />
                    {selectedTime ? (
                        <SeatMap
                            rows={coachLayoutConfig.rows}
                            cols={coachLayoutConfig.cols}
                            seatData={fullCoachSeatData}
                            onSeatSelectionChange={handleSeatSelection}
                        />
                    ) : (
                        <div className="text-center mt-5 d-flex align-items-center justify-content-center" style={{ height: '80%' }}>
                            <h5>Vui lòng chọn một khung giờ để xem sơ đồ ghế</h5>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
