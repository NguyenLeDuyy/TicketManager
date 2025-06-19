import { SeatStatus } from "../components/SeatMap"; // Đảm bảo đường dẫn đúng

export interface GeneratedSeatData {
    id: string;
    label: string;
    status: SeatStatus;
    gridPosition: { row: number; col: number };
}

export interface LayoutConfig {
    type: 'coach' | 'movie' | 'train';
    rows: number;
    cols: number;
    unavailableSeats?: { row: number; col: number }[];
    labelingScheme?: 'A1' | '1A' | 'sequential';
    // Thêm mục này để định nghĩa các nhãn đặc biệt
    specialLabels?: { row: number; col: number; label: string }[];
}

export function generateSeatLayout(config: LayoutConfig): GeneratedSeatData[] {
    const {
        rows,
        cols,
        unavailableSeats = [],
        labelingScheme = 'sequential',
        specialLabels = []
    } = config;

    const seatData: GeneratedSeatData[] = [];
    let sequentialCounter = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const position = { row, col };
            const id = `${row}-${col}`;

            // Kiểm tra xem có phải vị trí không khả dụng không
            const isUnavailable = unavailableSeats.some(s => s.row === row && s.col === col);
            if (isUnavailable) {
                seatData.push({ id, label: '', status: 'unavailable', gridPosition: position });
                continue;
            }

            // Kiểm tra xem có phải vị trí có nhãn đặc biệt không
            const specialLabelData = specialLabels.find(s => s.row === row && s.col === col);


            let label = '';
            let status: SeatStatus = 'free'; // Mặc định là 'free'


            if (specialLabelData) {
                // Chỉ đặt unavailable cho những ghế thực sự không thể đặt
                label = specialLabelData.label;
                // Chỉ những ghế này mới unavailable: Tài, Xế, X, Cửa, Lên
                if (['Tài', 'Xế', 'X', 'Cửa', 'Lên'].includes(specialLabelData.label)) {
                    status = 'unavailable';
                }
                // Các ghế khác (như 1A, 1B) vẫn có thể đặt được
            } else {
                switch (labelingScheme) {
                    case 'A1':
                        label = `${String.fromCharCode(65 + row)}${col + 1}`;
                        break;
                    case '1A':
                        label = `${row + 1}${String.fromCharCode(65 + col)}`;
                        break;
                    case 'sequential':
                    default:
                        label = (sequentialCounter++).toString();
                        break;
                }
            }

            if (row === 0 && col === 2) {
                label = '1A';
            }
            else if (row === 0 && col === 3) {
                label = '1B';
            }

            seatData.push({ id, label, status, gridPosition: position });
        }
    }

    return seatData;
}
