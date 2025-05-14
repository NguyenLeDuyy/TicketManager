import React from "react";
import { SchedulePanel } from "../components/SchedulePanel";
import { Col, Container, Row } from "react-bootstrap";
import { time } from "console";
import { SeatMap } from "../components/SeatMap";

export const CoachBooking: React.FC = () => {
    const times = ['14:00', '14:15', '14:30'];
    const handleSelectDate = (t: string) => console.log("Chọn", t);
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <SchedulePanel times={times} onSelect={handleSelectDate}></SchedulePanel>

                </Col>
                <Col md={9}>
                    <SeatMap

                    ></SeatMap>
                </Col>
            </Row>
        </Container>

    )
}