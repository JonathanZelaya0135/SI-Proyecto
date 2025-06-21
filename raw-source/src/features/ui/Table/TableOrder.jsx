import { useState } from 'react';
import DeleteButton from '../Button/DeleteButton';
import './Table.css';

export default function TableOrder({ data, headers, onDelete }) {
    const [tableData, setTableData] = useState(data);
    if (!data || data.length === 0) {
        return (
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header.key}>{header.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {headers.map((index) => (
                            <td key={index}>--</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        );
    }
    const handleDelete = (indexToDelete) => {
        const newData = tableData.filter((_, index) => index !== indexToDelete);
        setTableData(newData);
    };

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header.key}>{header.label}</th>
                    ))}
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header, cellIndex) => (
                            <td key={cellIndex}>{row[header.key]}</td>
                        ))}
                        <td class="button">
                            <DeleteButton handleClick={() => onDelete(row.orderNumber)} text={"Eliminar"} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}