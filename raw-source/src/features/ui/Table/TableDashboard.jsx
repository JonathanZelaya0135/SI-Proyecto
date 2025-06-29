import "./Table.css";

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
            {headers.map((header) => (
              <td key={header.key}>--</td>
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
              <td key={cellIndex}>
                {header.render ? header.render(row) : row[header.key] ?? "--"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
