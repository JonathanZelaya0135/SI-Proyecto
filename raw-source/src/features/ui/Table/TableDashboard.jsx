import './Table.css';

export default function TableDashboard({ data, headers }) {
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
                {data.map((row, index) => (
                    <tr key={index}>
                        {headers.map((header, cellIndex) => (
                            <td key={cellIndex}>{row[header.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}