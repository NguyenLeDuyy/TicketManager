import React, { useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import './CustomCalendar.css'
import './TimeGrid.css'

// Cấu trúc dữ liệu cho một khung giờ
export interface TimeSlot {
    time: string;
    info?: string; // Ví dụ: "28/33"
    status: 'available' | 'full'; // Chỉ cần 'available' và 'full'. 'selected' sẽ được xử lý riêng.
}

interface SchedulePanelProps {
    // Props mới cho dropdown
    routes: string[]; // Danh sách các tuyến đường, ví dụ: ["Bến Tre - Sài Gòn", "Sài Gòn - Bến Tre"]
    selectedRoute: string; // Tuyến đường đang được chọn
    onRouteSelect: (route: string) => void; // Hàm được gọi khi chọn tuyến đường mới

    onDateChange: (date: Date) => void; // Callback khi ngày trên lịch thay đổi
    selectedDate: Date; // Ngày đang được chọn, truyền từ component cha


    timeSlots: TimeSlot[];
    selectedTime: string | null;
    onTimeSelect: (time: string) => void;
}

export const SchedulePanel: React.FC<SchedulePanelProps> = ({
    routes,
    selectedRoute,
    onRouteSelect,
    selectedDate,
    onDateChange,
    timeSlots,
    selectedTime,
    onTimeSelect
}) => {

    const handleCalendarChange = (value: any) => {
        if (value instanceof Date) {
            onDateChange(value);
        }
    };

    // Hàm trả về class CSS dựa trên trạng thái của slot và giờ đang được chọn
    const getStatusClass = (slot: TimeSlot) => {
        if (selectedTime === slot.time) {
            return 'status-selected'; // Luôn ưu tiên hiển thị trạng thái đang được chọn
        }
        return `status-${slot.status}`; // Nếu không thì hiển thị trạng thái của chính nó (available hoặc full)
    };

    const formatShortWeekday = (locale: string | undefined, date: Date): string => {
        if (locale === 'vi-VN') {
            const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday ...
            const customDayHeaders = ["CN", "H", "B", "T", "N", "S", "B", "CN"]; // Sun, Mon, Tue...
            return customDayHeaders[dayIndex];

        }
        // Fallback for other locales or if vi-VN is not specified
        return date.toLocaleDateString(locale, { weekday: 'short' }).charAt(0);
    };

    return (
        <div>
            {/* 3. Thêm Dropdown (Form.Select) */}
            <Form.Select
                aria-label="Chọn tuyến đường"
                className="mb-3"
                value={selectedRoute}
                onChange={(e) => onRouteSelect(e.target.value)} // Gọi callback khi giá trị thay đổi
            >
                {/* Lặp qua mảng routes để tạo các lựa chọn */}
                {routes.map(route => (
                    <option key={route} value={route}>
                        {route}
                    </option>
                ))}
            </Form.Select>
            <Calendar
                onChange={handleCalendarChange}
                value={selectedDate}
                className={'mb-3'}
                locale="vi-VN"
                formatShortWeekday={(locale, date) => formatShortWeekday(locale, date)}
            />

            {/* Sử dụng Row và Col của Bootstrap để tạo lưới */}
            <Row xs={3} className="g-2 time-grid-container"> {/* 3 cột, gap là 2 */}
                {timeSlots.map(slot => (
                    <Col key={slot.time}>
                        <div
                            className={`time-slot ${getStatusClass(slot)}`}
                            onClick={() => slot.status !== 'full' && onTimeSelect(slot.time)}
                        >
                            <div className="time-slot-time">{slot.time}</div>
                            {slot.info && <div className="time-slot-info">{slot.info}</div>}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
};