import React, { useState } from "react";
import { SchedulePanel, TimeSlot } from "../components/SchedulePanel";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { SeatMap, SeatStatus } from "../components/SeatMap";

const taiSeatData: { id: string, label: string, status: SeatStatus, gridPosition: { row: number, col: number } }[] = [
    // Hàng 1
    { id: "T1", label: "1", status: 'free', gridPosition: { row: 0, col: 0 } },
    { id: "T2", label: "2\nQUYỀN\n038xxxx", status: 'booked', gridPosition: { row: 0, col: 1 } }, // Ghế có thông tin
    { id: "T3", label: "3\nTHỦY\n098xxxx", status: 'booked', gridPosition: { row: 0, col: 2 } },
    { id: "T4", label: "4", status: 'unavailable', gridPosition: { row: 0, col: 3 } }, // Có thể là lối đi hoặc ghế hỏng
    { id: "T5", label: "5\nTUYỀN\n091xxxx", status: 'booked', gridPosition: { row: 0, col: 4 } },

    // Hàng 2
    { id: "T6", label: "6", status: 'free', gridPosition: { row: 1, col: 0 } },
    { id: "T7", label: "7", status: 'free', gridPosition: { row: 1, col: 1 } },
    { id: "T8", label: "8", status: 'free', gridPosition: { row: 1, col: 2 } },
    { id: "T9", label: "9", status: 'unavailable', gridPosition: { row: 1, col: 3 } },
    { id: "T10", label: "10", status: 'free', gridPosition: { row: 1, col: 4 } },
    // ... Thêm các ghế khác cho tab "Tài" dựa theo hình ảnh
    // Ví dụ:
    { id: "T11", label: "11\nMAI\n092xxxx", status: 'booked', gridPosition: { row: 2, col: 0 } },
    { id: "T12", label: "12\nnghĩa\n093xxxx", status: 'booked', gridPosition: { row: 2, col: 1 } },
    { id: "T13", label: "13", status: 'free', gridPosition: { row: 2, col: 2 } },
    { id: "T14", label: "14", status: 'unavailable', gridPosition: { row: 2, col: 3 } },
    { id: "T15", label: "15\nTHANH\n091xxxx", status: 'booked', gridPosition: { row: 2, col: 4 } },
];

const xeSeatData: { id: string, label: string, status: SeatStatus, gridPosition: { row: number, col: number } }[] = [
    // Cấu hình ghế cho tab "Xé"
    { id: "X1", label: "X1", status: 'free', gridPosition: { row: 0, col: 0 } },
    { id: "X2", label: "X2", status: 'booked', gridPosition: { row: 0, col: 1 } },
    // ...
];


const seatLayouts = [
    { eventKey: "tai", title: "Tài", rows: 6, cols: 5, data: taiSeatData }, // Phỏng theo hình, 6 hàng ghế chính, 5 cột
    { eventKey: "xe", title: "Xé", rows: 5, cols: 4, data: xeSeatData }, // Ví dụ
    { eventKey: "1a", title: "1A", rows: 7, cols: 5, data: [] }, // Ví dụ
    { eventKey: "1b", title: "1B", rows: 7, cols: 5, data: [] }, // Ví dụ
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
    // Dữ liệu giả cho các tuyến đường
    const availableRoutes = ["Bến Tre - Sài Gòn", "Sài Gòn - Bến Tre", "Bến Tre - Cần Thơ"];

    // State cho dropdown
    const [selectedRoute, setSelectedRoute] = useState<string>(availableRoutes[0]);

    // 1. Quản lý state cho ngày và giờ được chọn ở component cha
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    // Quản lý state cho danh sách giờ để có thể cập nhật sau này
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);

    // 2. Tạo các hàm xử lý để truyền xuống cho SchedulePanel

    // Hàm xử lý khi chọn tuyến đường mới
    const handleRouteSelect = (route: string) => {
        console.log("Tuyến đường mới: ", route);
        setSelectedRoute(route);
        // Trong ứng dụng thực tế, bạn sẽ tải lại lịch trình và sơ đồ ghế cho tuyến đường mới này
        setSelectedTime(null); // Reset giờ đã chọn
    }

    // Hàm này sẽ được gọi khi ngày trên lịch thay đổi
    const handleDateChange = (newDate: Date) => {
        console.log("Ngày mới được chọn:", newDate.toLocaleDateString());
        setSelectedDate(newDate);
        setSelectedTime(null); // Reset giờ đã chọn khi ngày thay đổi
        // Trong ứng dụng thực tế, bạn có thể gọi API ở đây để lấy danh sách giờ mới cho ngày này
    };

    // Hàm này sẽ được gọi khi một giờ trong danh sách được chọn
    const handleTimeSelect = (time: string) => {

        // Cho phép chọn và bỏ chọn
        setSelectedTime(prevSelectedTime => prevSelectedTime === time ? null : time);
    };

    // Giả sử hàm này cho SeatMap
    const handleSeatSelection = (seats: any[]) => {
        console.log("Ghế được chọn: ", seats);
    }

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col md={2}>
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
                <Col md={10}>
                    <h4 className="mb-3">Tuyến: {selectedRoute}</h4>
                    <Tabs defaultActiveKey={seatLayouts[0].eventKey} id="coach-seat-tabs" className="mb-3">
                        {seatLayouts.map(layout => (
                            <Tab eventKey={layout.eventKey} title={layout.title} key={layout.eventKey}>
                                {selectedTime ? (
                                    <SeatMap
                                        rows={layout.rows}
                                        cols={layout.cols}
                                        seatData={layout.data}
                                        onSeatSelectionChange={handleSeatSelection}
                                    />
                                ) : (
                                    <div className="text-center mt-5">
                                        <h5>Vui lòng chọn một khung giờ để xem sơ đồ ghế</h5>
                                    </div>
                                )}
                            </Tab>
                        ))}
                    </Tabs>
                    {/* <SeatMap

                    ></SeatMap> */}
                </Col>
            </Row>
        </Container>

    )
}