import EditButton from '../Button/EditButton';
import DeleteButton from '../Button/DeleteButton';
import './Table.css';

export default function TableManage({ data, headers, onSend, onDelete }) {
    if (!data || data.length === 0) {
        return (
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header.key}>{header.label}</th>
                        ))}
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {headers.map((index) => (
                            <td key={index}>--</td>
                        ))}
                        <td>--</td>
                        <td>--</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header) => (
                        <th key={header.key}>{header.label}</th>
                    ))}
                    <th>Enviar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header, cellIndex) => (
                            <td key={cellIndex}>{row[header.key]}</td>
                        ))}
                        <td className="button">
                            <EditButton handleClick={() => onSend(index)} text={"Enviar"} />
                        </td>
                        <td className="button">
                            <DeleteButton handleClick={() => onDelete(row.orderNumber)} text={"Eliminar"} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
