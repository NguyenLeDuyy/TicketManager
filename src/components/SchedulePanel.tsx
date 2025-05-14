import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import Calendar from "react-calendar";

interface SchedulePanelProps {
    times: string[];
    onSelect: (times: string) => void;
}

export const SchedulePanel: React.FC<SchedulePanelProps> = ({ times, onSelect }) => {

    const [date, setDate] = useState<Date>(new Date());

    return (
        <div>
            <Calendar
                onChange={(value) => setDate(value as Date)}
                value={date}
                className={'mb-3'}
            ></Calendar>

            <ListGroup>
                {times.map(t => (
                    <ListGroup.Item
                        key={t}
                        action
                        onClick={() => onSelect(t)}
                    >{t}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
};